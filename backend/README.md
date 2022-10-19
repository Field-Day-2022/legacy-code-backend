# Legacy Code READ ME 
This is an explanation of the legacy code based on research,
meetings with the previous capstone team leader, and documentation.
The basis for this documentation was created by the 2020 Capstone team
and will be updated accordingly as we progress through updating the 
PWA.

## Sponsor  
Professor Heather Bateman - Professor and Researcher of Biology

## Contributors (2022 Capstone Team)
- Isaiah Lathem
- Jack Norman
- Dennis Grassl
- Ian Skelskey
- Zachary Jacobson

### Overview

The FieldDay Capture-Mark-Recapture (CMR) application is hosted on AWS and is made up of 3 components. The static 
front-end component is hosted on the S3 bucket, the back-end is accessed using Lambda, and the data is stored on an RDS 
MySQL instance. There are both live and test versions of each of these components, all of which have been configured 
appropriately per their environment. Updates need to be performed occasionally to each of these components, and this 
document details how to access and update each component.

[Link to web app](http://fieldday-react-prod.s3-website.us-east-2.amazonaws.com/login )  
[Link to test website](http://fieldday-react-test.s3-website.us-east-2.amazonaws.com/login)

### Requirements
1. **AWS**- Administrator access to the AWS account is required for the front-end and Cloud9 components. The current 
administrator should give new team members access to AWS.  
2. **Github (or another git repo)**- The source code for both the front- and back-end will be required to deploy. The 
master branch is used for deploying the live environment, and the dev branch is used for deploying to the test 
environment.
3. **Command line**- A command line interface (CLI) tool will be needed to interact with the serverless and build the 
front-end. The [npm Javascript utility](https://www.npmjs.com/get-npm) needs to be installed globally.

### System Architecture
Below is a diagram of how the project is hosted on AWS:  
![AWS Cloud](/Users/jacknorman/Desktop/legacy-code/backend/docs/Screen Shot 2022-10-18 at 9.49.07 PM.png "System Architecture")

All components of the project are contained in the same hosted on the same VPC (the default) and can be interacted with 
by either the S3 bucket, which is set up to be accessed publicly, or from the API gateway, which has access to the back-end.

### Setup

### Technical Details

### Troubleshooting

### References 