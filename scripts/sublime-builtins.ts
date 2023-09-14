export interface IBuiltinLangInfo {
	scope: string
	extensions?: string[]
}

export interface IBuiltinLangSetInfo {
	scope: string
	extensions?: Set<string>
}

export const builtinsJSON: Record<string, IBuiltinLangInfo> = {
	'YAML': {
		'scope': 'source.yaml',
		'extensions': [
			'yaml',
			'yml',
			'sublime-syntax',
		],
	},
	'XSL': {
		'scope': 'text.xml.xsl',
		'extensions': [
			'xsd',
			'xsl',
			'xslt',
		],
	},
	'XML': {
		'scope': 'text.xml',
		'extensions': [
			'xml',
			'tld',
			'dtml',
			'rng',
			'rss',
			'opml',
			'svg',
			'xaml',
		],
	},
	'DTD': {
		'scope': 'text.xml.dtd',
		'extensions': [
			'dtd',
			'ent',
			'mod',
		],
	},
	'Textile': {
		'scope': 'text.html.textile',
		'extensions': [
			'textile',
		],
	},
	'Tcl': {
		'scope': 'source.tcl',
		'extensions': [
			'tcl',
		],
	},
	'HTML (Tcl)': {
		'scope': 'text.html.tcl',
		'extensions': [
			'adp',
		],
	},
	'commands-builtin-shell-bash': {
		'scope': 'commands.builtin.shell.bash',
	},
	'Shell-Unix-Generic': {
		'scope': 'source.shell',
	},
	'Bash': {
		'scope': 'source.shell.bash',
		'extensions': [
			'sh',
			'bash',
			'bashrc',
			'ash',
			'zsh',
		],
	},
	'Scala': {
		'scope': 'source.scala',
		'extensions': [
			'scala',
			'sbt',
			'sc',
		],
	},
	'SQL': {
		'scope': 'source.sql',
		'extensions': [
			'sql',
			'ddl',
			'dml',
		],
	},
	'Rust': {
		'scope': 'source.rust',
		'extensions': [
			'rs',
		],
	},
	'Cargo': {
		'scope': 'source.build_results',
	},
	'Ruby': {
		'scope': 'source.ruby',
		'extensions': [
			'rb',
			'Appfile',
			'Appraisals',
			'Berksfile',
			'Brewfile',
			'capfile',
			'cgi',
			'Cheffile',
			'config.ru',
			'Deliverfile',
			'Fastfile',
			'fcgi',
			'Gemfile',
			'gemspec',
			'Guardfile',
			'irbrc',
			'jbuilder',
			'Podfile',
			'podspec',
			'prawn',
			'pryrc',
			'rabl',
			'rake',
			'Rakefile',
			'Rantfile',
			'rbx',
			'rjs',
			'ruby.rail',
			'Scanfile',
			'simplecov',
			'Snapfile',
			'thor',
			'Thorfile',
			'Vagrantfile',
		],
	},
	'reStructuredText': {
		'scope': 'text.restructuredtext',
		'extensions': [
			'rst',
			'rest',
		],
	},
	'Regex Replace': {
		'scope': 'source.regexp-replace',
	},
	'RegExp': {
		'scope': 'source.regexp',
		'extensions': [
			're',
		],
	},
	'File Pattern': {
		'scope': 'source.file-pattern',
	},
	'SQL (Rails)': {
		'scope': 'source.sql.ruby',
		'extensions': [
			'erbsql',
			'sql.erb',
		],
	},
	'Ruby on Rails': {
		'scope': 'source.ruby.rails',
		'extensions': [
			'rxml',
			'builder',
		],
	},
	'Ruby Haml': {
		'scope': 'text.haml',
		'extensions': [
			'haml',
			'sass',
		],
	},
	'JavaScript (Rails)': {
		'scope': 'source.js.rails',
		'extensions': [
			'js.erb',
		],
	},
	'HTML (Rails)': {
		'scope': 'text.html.ruby',
		'extensions': [
			'rails',
			'rhtml',
			'erb',
			'html.erb',
		],
	},
	'Rd (R Documentation)': {
		'scope': 'text.tex.latex.rd',
		'extensions': [
			'rd',
		],
	},
	'R': {
		'scope': 'source.r',
		'extensions': [
			'R',
			'Rprofile',
		],
	},
	'R Console': {
		'scope': 'source.r-console',
		'extensions': [],
	},
	'Regular Expressions (Python)': {
		'scope': 'source.regexp.python',
	},
	'Python': {
		'scope': 'source.python',
		'extensions': [
			'py',
			'py3',
			'pyw',
			'pyi',
			'pyx',
			'pyx.in',
			'pxd',
			'pxd.in',
			'pxi',
			'pxi.in',
			'rpy',
			'cpy',
			'SConstruct',
			'SConscript',
			'gyp',
			'gypi',
			'Snakefile',
			'vpy',
			'wscript',
			'bazel',
			'bzl',
		],
	},
	'Perl': {
		'scope': 'source.perl',
		'extensions': [
			'pl',
			'pc',
			'pm',
			'pmc',
			'pod',
			't',
		],
	},
	'Pascal': {
		'scope': 'source.pascal',
		'extensions': [
			'pas',
			'p',
			'dpr',
		],
	},
	'Regular Expressions (PHP)': {
		'scope': 'source.regexp.php',
	},
	'PHP': {
		'scope': 'embedding.php',
		'extensions': [
			'php',
			'php3',
			'php4',
			'php5',
			'php7',
			'phps',
			'phpt',
			'phtml',
		],
	},
	'PHP Source': {
		'scope': 'source.php',
	},
	'Objective-C': {
		'scope': 'source.objc',
		'extensions': [
			'm',
			'h',
		],
	},
	'Objective-C++': {
		'scope': 'source.objc++',
		'extensions': [
			'mm',
			'M',
			'h',
		],
	},
	'camlp4': {
		'scope': 'source.camlp4.ocaml',
	},
	'OCamlyacc': {
		'scope': 'source.ocamlyacc',
		'extensions': [
			'mly',
		],
	},
	'OCamllex': {
		'scope': 'source.ocamllex',
		'extensions': [
			'mll',
		],
	},
	'OCaml': {
		'scope': 'source.ocaml',
		'extensions': [
			'ml',
			'mli',
		],
	},
	'Matlab': {
		'scope': 'source.matlab',
		'extensions': [
			'matlab',
		],
	},
	'MultiMarkdown': {
		'scope': 'text.html.markdown.multimarkdown',
	},
	'Markdown': {
		'scope': 'text.html.markdown',
		'extensions': [
			'md',
			'mdown',
			'markdown',
			'markdn',
		],
	},
	'Makefile': {
		'scope': 'source.makefile',
		'extensions': [
			'make',
			'GNUmakefile',
			'Makefile',
			'Makefile.am',
			'Makefile.in',
			'OCamlMakefile',
			'mak',
			'mk',
		],
	},
	'Makefile Shell': {
		'scope': 'source.shell.embedded.makefile',
	},
	'Make Output': {
		'scope': 'source.build_output',
	},
	'Lua': {
		'scope': 'source.lua',
		'extensions': [
			'lua',
		],
	},
	'Lisp': {
		'scope': 'source.lisp',
		'extensions': [
			'lisp',
			'cl',
			'clisp',
			'l',
			'mud',
			'el',
			'scm',
			'ss',
			'lsp',
			'fasl',
		],
	},
	'TeX': {
		'scope': 'text.tex',
		'extensions': [
			'sty',
			'cls',
		],
	},
	'LaTeX': {
		'scope': 'text.tex.latex',
		'extensions': [
			'tex',
			'ltx',
		],
	},
	'LaTeX Log': {
		'scope': 'text.log.latex',
	},
	'Bibtex': {
		'scope': 'text.bibtex',
		'extensions': [
			'bib',
		],
	},
	'TypeScript': {
		'scope': 'source.ts',
		'extensions': [
			'ts',
		],
	},
	'TSX': {
		'scope': 'source.tsx',
		'extensions': [
			'tsx',
		],
	},
	'Regular Expressions (JavaScript)': {
		'scope': 'source.regexp.js',
	},
	'JavaScript': {
		'scope': 'source.js',
		'extensions': [
			'js',
			'mjs',
			'htc',
		],
	},
	'JSX': {
		'scope': 'source.jsx',
		'extensions': [
			'jsx',
		],
	},
	'JavaProperties': {
		'scope': 'source.java-props',
		'extensions': [
			'properties',
		],
	},
	'JavaDoc': {
		'scope': 'text.html.javadoc',
		'extensions': [],
	},
	'Java': {
		'scope': 'source.java',
		'extensions': [
			'java',
			'bsh',
		],
	},
	'Java Server Pages (JSP)': {
		'scope': 'text.html.jsp',
		'extensions': [
			'jsp',
		],
	},
	'JSON': {
		'scope': 'source.json',
		'extensions': [
			'json',
			'sublime-build',
			'sublime-color-scheme',
			'sublime-commands',
			'sublime-completions',
			'sublime-keymap',
			'sublime-macro',
			'sublime-menu',
			'sublime-mousemap',
			'sublime-project',
			'sublime-settings',
			'sublime-theme',
			'sublime-workspace',
			'ipynb',
			'Pipfile.lock',
		],
	},
	'Literate Haskell': {
		'scope': 'text.tex.latex.haskell',
		'extensions': [
			'lhs',
		],
	},
	'Haskell': {
		'scope': 'source.haskell',
		'extensions': [
			'hs',
		],
	},
	'HTML': {
		'scope': 'text.html.basic',
		'extensions': [
			'html',
			'htm',
			'shtml',
			'xhtml',
		],
	},
	'HTML (Plain)': {
		'scope': 'text.html.plain',
	},
	'Groovy': {
		'scope': 'source.groovy',
		'extensions': [
			'groovy',
			'gvy',
			'gradle',
			'Jenkinsfile',
		],
	},
	'DOT': {
		'scope': 'source.dot',
		'extensions': [
			'dot',
			'gv',
		],
	},
	'Go': {
		'scope': 'source.go',
		'extensions': [
			'go',
		],
	},
	'Git Rebase': {
		'scope': 'text.git.rebase',
		'extensions': [
			'git-rebase-todo',
		],
	},
	'Git Mailmap': {
		'scope': 'text.git.mailmap',
		'extensions': [
			'.mailmap',
			'mailmap',
		],
	},
	'Git Log': {
		'scope': 'text.git.log',
		'extensions': [
			'gitlog',
		],
	},
	'Git Link': {
		'scope': 'text.git.link',
		'extensions': [
			'.git',
		],
	},
	'Git Ignore': {
		'scope': 'text.git.ignore',
		'extensions': [
			'exclude',
			'gitignore',
			'.gitignore',
			'sparse-checkout',
		],
	},
	'Git Config': {
		'scope': 'text.git.config',
		'extensions': [
			'gitconfig',
			'.gitconfig',
			'.gitmodules',
		],
	},
	'Git Common': {
		'scope': 'text.git.common',
	},
	'Git Commit': {
		'scope': 'text.git.commit',
		'extensions': [
			'COMMIT_EDITMSG',
			'MERGE_MSG',
			'TAG_EDITMSG',
		],
	},
	'Git Attributes': {
		'scope': 'text.git.attributes',
		'extensions': [
			'attributes',
			'gitattributes',
			'.gitattributes',
		],
	},
	'HTML (Erlang)': {
		'scope': 'text.html.erlang',
		'extensions': [
			'yaws',
		],
	},
	'Erlang': {
		'scope': 'source.erlang',
		'extensions': [
			'erl',
			'hrl',
			'escript',
		],
	},
	'Diff': {
		'scope': 'source.diff',
		'extensions': [
			'diff',
			'patch',
		],
	},
	'DMD Output': {
		'scope': 'source.build_output.dmd',
	},
	'D': {
		'scope': 'source.d',
		'extensions': [
			'd',
			'di',
		],
	},
	'ClojureScript': {
		'scope': 'source.clojure.clojurescript',
		'extensions': [
			'cljs',
			'cljc',
		],
	},
	'Clojure': {
		'scope': 'source.clojure',
		'extensions': [
			'clj',
			'cljc',
			'edn',
		],
	},
	'CSS': {
		'scope': 'source.css',
		'extensions': [
			'css',
			'css.erb',
			'css.liquid',
		],
	},
	'C': {
		'scope': 'source.c',
		'extensions': [
			'c',
			'h',
		],
	},
	'C++': {
		'scope': 'source.c++',
		'extensions': [
			'cpp',
			'cc',
			'cp',
			'cxx',
			'c++',
			'C',
			'h',
			'hh',
			'hpp',
			'hxx',
			'h++',
			'inl',
			'ipp',
		],
	},
	'C#': {
		'scope': 'source.cs',
		'extensions': [
			'cs',
			'csx',
		],
	},
	'Build': {
		'scope': 'source.nant-build',
		'extensions': [
			'build',
		],
	},
	'Batch File': {
		'scope': 'source.dosbatch',
		'extensions': [
			'bat',
			'cmd',
		],
	},
	'AppleScript': {
		'scope': 'source.applescript',
		'extensions': [
			'applescript',
			'script editor',
		],
	},
	'ActionScript': {
		'scope': 'source.actionscript.2',
		'extensions': [
			'as',
		],
	},
	'HTML (ASP)': {
		'scope': 'text.html.asp',
		'extensions': [
			'asp',
			'asa',
		],
	},
	'ASP': {
		'scope': 'source.asp',
		'extensions': [
			'vbs',
		],
	},
}

export const builtinsSet =
	(Object.keys(builtinsJSON) as (keyof typeof builtinsJSON)[]).reduce<
		Record<keyof typeof builtinsJSON, IBuiltinLangSetInfo>
	>((acc, cur) => {
		acc[cur] = {
			scope: builtinsJSON[cur].scope,
			extensions: builtinsJSON[cur].extensions != null
				? new Set(builtinsJSON[cur].extensions)
				: undefined,
		}
		return acc
	}, Object.create(null))

export const allScopesSet =
	(Object.keys(builtinsJSON) as (keyof typeof builtinsJSON)[]).reduce<
		Set<string>
	>((acc, cur) => {
		acc.add(builtinsJSON[cur].scope)
		return acc
	}, new Set())

export const allExtensionsSet =
	(Object.keys(builtinsJSON) as (keyof typeof builtinsJSON)[]).reduce<
		Set<string>
	>((acc, cur) => {
		for (const ext of builtinsJSON[cur].extensions ?? []) {
			acc.add(ext)
		}
		return acc
	}, new Set())

console.dir(allScopesSet)
