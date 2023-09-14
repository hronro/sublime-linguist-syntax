import { assertEquals } from './deps.ts'

import { flatRepository, ITmLanguage } from './flat-repository.ts'

Deno.test('should not change if there is no repositories', () => {
	const input: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
		],
	}
	const output = structuredClone(input)

	flatRepository(input)

	assertEquals(input, output)
})

Deno.test('should not change if the repository is not nested', () => {
	const input: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comment',
			},
			{
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
		],
		repository: {
			comment: {
				name: 'comment.block.foobar',
				begin: '/\\*',
				end: '\\*/',
			},
		},
	}
	const output = structuredClone(input)

	flatRepository(input)

	assertEquals(input, output)
})

Deno.test('flat repository when the repository is nested', () => {
	const input: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comments',
			},
			{
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
		],
		repository: {
			comments: {
				patterns: [
					{
						include: '#inline',
					},
					{
						name: 'comment.block.foobar',
						begin: '/\\*',
						end: '\\*/',
					},
				],
				repository: {
					inline: {
						match: '(//).*$\\n?',
						captures: {
							0: {
								name: 'punctuation.definition.comment.foobar',
							},
							1: {
								name: 'comment.line.double-slash.foobar',
							},
						},
					},
				},
			},
		},
	}
	const output: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comments',
			},
			{
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
		],
		repository: {
			comments: {
				patterns: [
					{
						include: '#comments-inline',
					},
					{
						name: 'comment.block.foobar',
						begin: '/\\*',
						end: '\\*/',
					},
				],
			},
			'comments-inline': {
				match: '(//).*$\\n?',
				captures: {
					0: {
						name: 'punctuation.definition.comment.foobar',
					},
					1: {
						name: 'comment.line.double-slash.foobar',
					},
				},
			},
		},
	}

	flatRepository(input)

	assertEquals(input, output)
})

Deno.test('flat repository when the repository is supper nested', () => {
	const input: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comments',
			},
			{
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
		],
		repository: {
			comments: {
				patterns: [
					{
						include: '#inline',
					},
					{
						name: 'comment.block.foobar',
						begin: '/\\*',
						end: '\\*/',
					},
				],
				repository: {
					inline: {
						patterns: [
							{
								include: '#triple',
							},
							{
								match: '(//).*$\\n?',
								captures: {
									0: {
										name:
											'punctuation.definition.comment.foobar',
									},
									1: {
										name:
											'comment.line.double-slash.foobar',
									},
								},
							},
						],
						repository: {
							triple: {
								match: '(///).*$\\n?',
								captures: {
									0: {
										name:
											'punctuation.definition.comment.foobar',
									},
									1: {
										name:
											'comment.line.triple-slash.foobar',
									},
								},
							},
						},
					},
				},
			},
		},
	}
	const output: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comments',
			},
			{
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
		],
		repository: {
			comments: {
				patterns: [
					{
						include: '#comments-inline',
					},
					{
						name: 'comment.block.foobar',
						begin: '/\\*',
						end: '\\*/',
					},
				],
			},
			'comments-inline': {
				patterns: [
					{
						include: '#comments-inline-triple',
					},
					{
						match: '(//).*$\\n?',
						captures: {
							0: {
								name: 'punctuation.definition.comment.foobar',
							},
							1: {
								name: 'comment.line.double-slash.foobar',
							},
						},
					},
				],
			},
			'comments-inline-triple': {
				match: '(///).*$\\n?',
				captures: {
					0: {
						name: 'punctuation.definition.comment.foobar',
					},
					1: {
						name: 'comment.line.triple-slash.foobar',
					},
				},
			},
		},
	}

	flatRepository(input)

	assertEquals(input, output)
})

Deno.test('pick a different pattern name when the name is conflict', () => {
	const input: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comments',
			},
		],
		repository: {
			'comments-inline': {
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
			'comments-inline-1': {
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
			comments: {
				patterns: [
					{
						include: '#inline',
					},
					{
						name: 'comment.block.foobar',
						begin: '/\\*',
						end: '\\*/',
					},
				],
				repository: {
					inline: {
						match: '(//).*$\\n?',
						captures: {
							0: {
								name: 'punctuation.definition.comment.foobar',
							},
							1: {
								name: 'comment.line.double-slash.foobar',
							},
						},
					},
				},
			},
		},
	}

	const output: ITmLanguage = {
		name: 'foobar',
		scopeName: 'source.foobar',
		patterns: [
			{
				include: '#comments',
			},
		],
		repository: {
			'comments-inline': {
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
			'comments-inline-1': {
				name: 'string.quoted.double.foobar',
				begin: '"',
				end: '"',
				patterns: [
					{
						name: 'constant.character.escape.foobar',
						match: '\\\\.',
					},
				],
			},
			comments: {
				patterns: [
					{
						include: '#comments-inline-2',
					},
					{
						name: 'comment.block.foobar',
						begin: '/\\*',
						end: '\\*/',
					},
				],
			},
			'comments-inline-2': {
				match: '(//).*$\\n?',
				captures: {
					0: {
						name: 'punctuation.definition.comment.foobar',
					},
					1: {
						name: 'comment.line.double-slash.foobar',
					},
				},
			},
		},
	}

	flatRepository(input)

	assertEquals(input, output)
})
