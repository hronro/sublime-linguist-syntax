import { join, parseYaml, tgz, writeAll } from './deps.ts'

import { flatRepository, ITmLanguage } from './flat-repository.ts'
import { allScopesSet } from './sublime-builtins.ts'
import { jsonToPlist } from './json-to-plist.ts'

const pathToRelease = Deno.args[0]

if (Deno.build.os === 'windows') {
	throw new Error('Unsupported OS')
}

// make sure we have proper permissions
const permissions = [
	{ name: 'net', host: 'github.com' },
	{ name: 'net', host: 'api.github.com' },
	{ name: 'net', host: 'objects.githubusercontent.com' },
	{ name: 'net', host: 'raw.githubusercontent.com' },
	{ name: 'read', path: '/tmp' },
	{ name: 'write', path: '/tmp' },
	{ name: 'write', path: pathToRelease },
] as const

for (const permission of permissions) {
	await Deno.permissions.request(permission)
}

interface IGitHubReleaseInfo {
	// deno-lint-ignore camelcase
	tag_name: string
	assets: {
		url: string
		browser_download_url: string
		name: string
	}[]
}

const latestLinguistReleaseInfoResponse = await fetch(
	'https://api.github.com/repos/github/linguist/releases/latest',
)
const latestLinguistReleaseInfo: IGitHubReleaseInfo =
	await latestLinguistReleaseInfoResponse.json()

if (
	latestLinguistReleaseInfo.assets[0]?.name !== 'linguist-grammars.tar.gz' ??
		false
) {
	throw new Error('Unknown Linguist GitHub assets')
}

const tmpdir = await Deno.makeTempDir()
const linguistAssetPath = join(tmpdir, 'linguist-grammars.tar.gz')
const linguistAsset = await Deno.open(linguistAssetPath, {
	write: true,
	create: true,
})

const linguistAssetResponse = await fetch(
	latestLinguistReleaseInfo.assets[0].browser_download_url,
)

if (linguistAssetResponse.body == null) {
	throw new Error('The response body of linguist asset is null')
}
for await (const chunk of linguistAssetResponse.body) {
	await writeAll(linguistAsset, chunk)
}

await tgz.uncompress(linguistAssetPath, tmpdir)

interface ILinguistInfo {
	[languageName: string]: {
		type: 'programming' | 'data' | 'markup' | 'prose'
		extensions?: string[]
		filenames?: string[]
		tm_scope?: string
	}
}

const linguistInfoYamlResponse = await fetch(
	`https://raw.githubusercontent.com/github/linguist/${latestLinguistReleaseInfo.tag_name}/lib/linguist/languages.yml`,
)
const linguistInfoYaml = await linguistInfoYamlResponse.text()
// deno-lint-ignore no-explicit-any
const linguistInfo: ILinguistInfo = parseYaml(linguistInfoYaml) as any

const textDecoder = new TextDecoder('utf-8')
const textEncoder = new TextEncoder()
await Promise.all(
	Object.keys(linguistInfo).map(async (language) => {
		const info = linguistInfo[language]

		if (info.tm_scope !== 'none' && info.tm_scope != null) {
			const tmJsoaString = textDecoder.decode(
				await Deno.readFile(
					join(tmpdir, 'linguist-grammars', `${info.tm_scope}.json`),
				),
			)
			const tmJson: ITmLanguage = JSON.parse(tmJsoaString)
			if (info.extensions != null && info.extensions.length) {
				tmJson.fileTypes = info.extensions.map((ext) => ext.slice(1))
			} else if (info.filenames != null && info.filenames.length) {
				if (tmJson.fileTypes == null) {
					tmJson.fileTypes = []
				}
				for (const filename of info.filenames) {
					tmJson.fileTypes.push(filename)
				}
			} else {
				console.warn(`no fileTypes for language \`${language}\``)
			}

			// skip if Sublime builtin package already include this syntax
			if (!allScopesSet.has(tmJson.scopeName)) {
				flatRepository(tmJson)
				const tm = jsonToPlist(tmJson)
				await Deno.writeFile(
					join(pathToRelease, `${language}.tmLanguage`),
					textEncoder.encode(tm),
				)
			}
		}
	}),
)

await Deno.remove(tmpdir, { recursive: true })
console.log(' ✅ Done!')
