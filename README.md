# Mess Complaint Portal

A web-based portal for submitting and managing complaints related to mess services.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Mess Complaint Portal provides a centralized platform for users, wardens, and administrators to handle various aspects related to mess services. It includes features for complaint management, menu updates, bill management, and more.

## Features

### User Management
- **Secure Login and Authentication**: Users and administrators can securely log in using Node Mailer with two-step verification (self-verification and verification by warden/DSW).
- **Profile Management**: Users can view and manage their profiles.

### Complaint Management
- **Complaint Creation**: Users can create new complaints with details like category, description, and urgency level.
- **Complaint View and Deletion**: Users can view their submitted complaints and delete them if needed.
- **Comments and Voting**: Users can add comments to complaints and upvote/downvote them.
- **Status Tracking**: Users can track the status of their complaints (pending, resolved, escalated).

### Menu and Notice Management
- **Mess Menu**: Only the Mess Representative (MR) can add/update the mess menu.
- **Notices**: Users can view notices related to the mess, added by the MR.

### Warden and DSW Interaction
- **Complaint Escalation**: Wardens can escalate complaints to the Deputy Warden (DSW) via email.
- **Student List**: Wardens can view and download lists of students in their hostel.

### Bill and Expense Management
- **Monthly Bills**: Users can check their monthly mess bills.
- **Bill Management**: The Accountant can manage bills individually or hostel-wise.
- **Expense Management**: Track and manage expenses related to mess services.

## Installation

To run the Mess Complaint Portal locally, follow these steps:

1. Clone the repository: git clone https://github.com/nickoo20/messPortal.git

2. Navigate into the project directory:

3. Install dependencies: npm install
4. Set up the database:
- Configure your database settings in backend/db. 
5. Start the server:  npm run dev

6. Access the portal at `http://localhost:3000` in your web browser.

## Usage

1. **User Registration and Login**:
- Users and administrators can register and login securely.

2. **Submitting a Complaint**:
- Users can fill out a complaint form with details such as title and description of complaint.

3. **Tracking Complaint Status**:
- Users can view the status of their submitted complaints and any updates. Users can upvote, dowvote or add comments on others complaint.

4. **Admin Dashboard** for Wardens :
- Administrators can log in to view a dashboard displaying all complaints.
- They can assign complaints to specific personnel for resolution.

5. **Resolving Complaints**:
- Administrators can update the status of complaints and provide resolution details.

## Configuration
- Create configurationa as defined in sample.txt file.
- Configure environment variables such as database connection details, email server settings, etc., in `.env` file or through environment variables.
<!-- MONGO_URL=
PORT=8080
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
WARDEN_EMAIL=
NODE_ENV=development
// Create new accounts for email_user and then generate corrresponding app password for that so that we both can use that same email for this project.
// Also, create new warden email, accountant email etc e.g : warden@gmail.com, accountant@gmail.com etc. -->

## Contributing

Contributions are welcome! Please follow these guidelines:
- Fork the repository, then clone it locally.
- Create a new branch for your feature or bug fix.
- Ensure your code follows the project's coding style and conventions.
- Submit a pull request with a clear description of your changes.

## License



