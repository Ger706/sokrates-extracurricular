export const environment = {

  production: false,
  next: 'https://next.sokrates.xyz',
  local: false,
  auth: {
    url: 'auth.api.sokrates.xyz:4430',
    secure: true
  },
  upload: {
    url: 'apps.utils.sokrates.xyz:8001',
    secure: true,
    // url: 'localhost:3000',
    // secure: false,
  },
  api: {
    url: 'api.sokrates.xyz',
    secure: true,
  },
  system: {
    url: 'system.api.sokrates.xyz',
    secure: true
  },
  client: {
    url: 'CLIENT_API_URL',
    secure: false
  },
  storage: {
    url: 'https://sokrates-multitenant-development-bucket.s3-ap-southeast-1.amazonaws.com'
  },
  dashboard: {
    url: 'dashboard.sokrates.xyz',
    secure: true,
  },
  export: {
    url: 'export.sokrates.xyz:4430',
    secure: true,
  },
  accurate: {
    client_id: '9c1a9c62-ad8c-4a1f-8ef2-bc48f5c0f60c',
    encoded_client_id_secret: 'OWMxYTljNjItYWQ4Yy00YTFmLThlZjItYmM0OGY1YzBmNjBjOjE5ODBkY2JhMzM2MGMyNmUzOWNkM2M0ZmJjY2E4M2I0',
  },
  spreadsheets: {
    url: 'https://spreadsheets.sokrates.xyz',
  },
};
