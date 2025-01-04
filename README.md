# Project Setup Instructions

## Client Setup

1. **Add Firebase Configuration to Environment Variables**:
   - Create a `.env` file in the `client` folder.
   - Add the following keys to the `.env` file:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER=your_firebase_messaging_sender
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
     REACT_APP_BACKEND_URL=your_backend_url
     ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run start
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Server Setup

1. **Add Configuration to Environment Variables**:
   - Create a `.env` file in the `server` folder.
   - Add the following keys to the `.env` file:
     ```env
     MONGODB_URL=your_mongodb_url
     FIREBASE_SERVICE_ACCOUNT=your_firebase_service_account_keys
     JWT_SECRET=your_jwt_secret
     SMTP_PASSWORD=your_email_app_password
     SMTP_EMAIL=your_email
     TELE_SIGN_CUSTOMER_ID=your_telesign_customer_id
     TELE_SIGN_API_KEY=your_telesign_api_key
     ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   ```bash
   npm start
   ```

---

## Notes
- Make sure you replace all placeholder values in the `.env` files with your actual configuration details.
- Ensure MongoDB is running and accessible.
- For Firebase, ensure your service account file is correctly set up and referenced in the server.
