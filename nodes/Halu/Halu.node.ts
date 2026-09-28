import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Halu implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Komplex AI Hallucination Detector',
		name: 'halu',
		icon: 'file:halu.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Score an LLM response for hallucination risk',
		defaults: {
			name: 'Halu',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'haluApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Detect Hallucination',
						value: 'detect',
						action: 'Detect hallucination in an LLM response',
						routing: {
							request: {
								method: 'POST',
								url: '/api/detect',
							},
						},
					},
				],
				default: 'detect',
			},
			{
				displayName: 'Response Text',
				name: 'response',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				description: 'The LLM-generated text to score (English, up to 2,048 characters)',
				routing: {
					request: {
						body: {
							response: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Prompt (Optional)',
				name: 'prompt',
				type: 'string',
				default: '',
				description:
					'The prompt the model saw. Including it improves accuracy on context-dependent claims. Leave blank to score the response alone.',
				routing: {
					send: {
						property: 'prompt',
						type: 'body',
						value: '={{$value}}',
						// Only send the prompt when the user actually provided one.
						preSend: [
							async function (this, requestOptions) {
								const prompt = this.getNodeParameter('prompt', '') as string;
								if (!prompt) {
									const body = (requestOptions.body ?? {}) as Record<string, unknown>;
									delete body.prompt;
									requestOptions.body = body;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Task',
				name: 'task',
				type: 'options',
				options: [
					{ name: 'Multiclass (Full Regime Breakdown)', value: 'multiclass' },
					{ name: 'Binary', value: 'binary' },
				],
				default: 'multiclass',
				routing: {
					request: {
						body: {
							task: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
