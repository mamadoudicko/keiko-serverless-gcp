export * from './cloud_functions';

import app from './cloud_run/index'; // Import your Express app

const PORT = process.env.PORT ?? 3000;  // Define the port you want to listen on

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
