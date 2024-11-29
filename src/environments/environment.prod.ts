import {version} from '../../package.json';

export const environment = {
  appVersion: version,
  production: true,
  next: 'https://next.sokrates.xyz',
  local: false,
  auth: {
    url: 'auth.api.sokrates.co.id',
    secure: true
  },
  api: {
    url: 'api.sokrates.co.id',
    secure: true,
  },
  system: {
    url: 'system.api.sokrates.co.id',
    secure: true
  },
  upload: {
    url: 'apps.utils.sokrates.co.id',
    secure: true,
    // url: 'localhost:3001',
    // secure: false,
  },
  client: {
    url: 'CLIENT_API_URL',
    secure: true
  },
  storage: {
    url: 'https://files.sokrates.co.id'
  },
  dashboard: {
    url: 'dashboard.sokrates.co.id',
    secure: true,
  },
  export: {
    url: 'export.sokrates.co.id',
    secure: true,
  },
  accurate: {
    client_id: '9c1a9c62-ad8c-4a1f-8ef2-bc48f5c0f60c',
    encoded_client_id_secret: 'OWMxYTljNjItYWQ4Yy00YTFmLThlZjItYmM0OGY1YzBmNjBjOjE5ODBkY2JhMzM2MGMyNmUzOWNkM2M0ZmJjY2E4M2I0',
  },
  spreadsheets: {
    url: 'https://spreadsheets.sokrates.co.id',
  },
};
