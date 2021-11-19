import { startServer } from './server/utils/start-server.js';
import { SERVICE_APP_PORT, SERVICE_ADMIN_PORT } from './server/lib/constants.js';
import serverApp from './server/index.js';
import serverAdmin from './server/admin.js';

startServer('kiddo', serverApp, {port: SERVICE_APP_PORT});

startServer('admin', serverAdmin, {port: SERVICE_ADMIN_PORT});