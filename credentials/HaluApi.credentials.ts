import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class HaluApi implements ICredentialType {
	name = 'haluApi';

	displayName = 'Komplex AI (halu) API';

	documentationUrl = 'https://detector.komplexai.io/guide';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your halu API key (sk_...). Create one free at https://detector.komplexai.io/account/keys',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.komplexai.io',
			description: 'API base URL. Leave as default unless self-hosting.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
