# PillCenter

PillCenter is a web application that streamlines medicine management and purchasing by integrating vending machines with prescription and non-prescription medications. The application allows patients to conveniently locate nearby vending machines, communicate with pharmacists through video chat using Agora.io, receive email notifications, and generate QR codes for seamless medicine pickup.

## Features

- **Find Nearest Vending Machine**: Utilize the navigation feature, powered by the Google Maps API, to locate the nearest vending machine, making it easy for patients to access their required medications.

- **Video Chat Consultations**: Enable patients to communicate with pharmacists in real-time through video chat using Agora.io, ensuring personalized and convenient consultations.

- **Automated Email Notifications**: Receive automated email notifications for prescription refills, order confirmations, and important updates.

- **QR Code Generation**: Generate unique QR codes for each medication purchase, allowing patients to easily retrieve their medicines from the vending machines.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Ronvak/PillCenter.git
  
   ```
2. Install the dependencies for the front-end:
   ```
   cd code/frontend/pillcenter-frontend
   npm install
   
   ```
   
3. Install the dependencies for the back-end:
```
  cd code/backend/
  py -m venv venv
  .\venv\Scripts\Activate.ps1
  pip install -r requirements.txt
```
4. Configure the database connection , secret key ,email and Agora.io's credentials in the `settings.py` file of the Django project.

5. Obtain a Google Maps API key and replace `YOUR_API_KEY` in the front-end code (``` code/frontend/pillcenter-frontend/src/components/orderFlow/GoogleMaps.js ```) with your actual API key.

   
6. Replace your Agora.io credentials at  (```code/frontend/pillcenter-frontend/src/agora/settings.js ```)

7. 
    Run the development servers:
- Front-end: 
  ```
  npm start
  ```
- Back-end: 
  ```
  python manage.py runserver
  ```

## Technologies Used

- React.js
- Django
- Material-UI
- MySQL 
- WebRTC (for video chat functionality using Agora.io)
- Qrcode code generation python library  
- Google Maps API (for location-based features and navigation)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit a pull request. For major changes, please open an issue to discuss them beforehand.

## License

This project is licensed under the [MIT License](LICENSE).



