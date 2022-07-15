# Restaurant Orders Management
![Admin Panel](https://i.ibb.co/d4Q051J/rest-mgmt-screenshot.png)
## Description 👈
This repository is an *Online Orders Management System* made specifically for your restaurant built mainly using the [SvelteKit](https://kit.svelte.dev/) framework, [TailwindCSS](https://tailwindcss.com/), [Sanity.io](https://www.sanity.io/)'s CMS and [Firebase](https://firebase.google.com) backend for authentication and real-time Cloud Firestore's updates.

## Launch App (Live Demo 🚀)

**[Click Here to Launch the App](https://pizzahome.vercel.app)**

  

**Admin Email**: *test@pizzahome.com*

  

**Admin Password**: _4c696275_

> These credentials are for *Test Mode* only which restricts making any real changes to the actual website.

  

You can customize it and make it yours within minutes and deploy it within seconds with Vercel's one-click automatic build and deploy using the comprehensive step-by-step guide given below.

  

## Features

  

- Responsive and Intuitive

- Supports *Dark Mode*

- PWA

- Server-side rendered

- Fully Customizable Menu

- Landing page

- Adding/Deleting User Reviews

- "Chat with Us" box

- No registration required for Users

- [Admin Panel](https://pizzahome.vercel.app/admin) (Accessible under the same domain to manage orders)

- Strict Security Rules for secure access

- [Deals Generator](https://pizzahome.vercel.app/admin/dashboard/deals)

- Advanced orders search

- Restrict orders placement after Closing hours

- End-to-end testing with _Cypress_

## Setting Up Guide

Start by cloning the git repository locally and installing the dependencies.

  

	git clone https://github.com/raz0229/restaurant-orders-management.git
	cd restaurant-orders-management
	npm install
	
Other packages:

    npm i -g @sanity/cli firebase cypress
## Configuration
### Firebase
Start up a ``firebase`` project locally and by running ``firebase init firestore``.

[Get Started with Firebase CLI](https://firebase.google.com/docs/cli)

Place your Firebase Configuration  settings in *`src/lib/config/app.js`.* in `firebaseConfig` object.
After setting up your firebase project, enable ``Firebase Authentication`` with Email and Password from the web interface and copy the UID of a user you intend to make the Admin.
> All other users created under the same project will be running under *Test Mode* i.e they will able to login and view orders but not have access to make any changes in your Firestore database.

In your local, `firestore.rules` files, paste these rules and replace the UID with the one you copied:

    rules_version =  '2';
	service  cloud.firestore {
		match /databases/{database}/documents {

		  // match docs in orders collection
		  match /orders/{document=**} {
			allow  create;
			allow  read: if  request.auth.uid  !=  	null;
			allow  update, delete: if  request.auth.uid  ==  '<YOUR UID>';
		  }
		  
		  match /deals/{document=**} {
			allow  read;
			allow  write: if  request.auth.uid  ==  '<YOUR UID>';
		  }
		
		  match /reviews/{any} {
			allow  read, create;
			allow  update, delete: if  request.auth.uid  ==  '<YOUR UID>';
		  }
		  
		  match /settings/{document=**} {
			allow  read;
			allow  write: if  request.auth.uid  ==  '<YOUR UID>';
		  }

		}
	}
Also save the UID as `VITE_UID` environment variable in `.env` file in the root of your project.

Now, In your local `firestore.indexes.json`:

    {
		"indexes": [
			{
				"collectionGroup": "orders",
				"queryScope": "COLLECTION",
				"fields": [
				{
					"fieldPath": "phone",
					"order": "ASCENDING"
				},
				{
					"fieldPath": "latest",
					"order": "ASCENDING"
				}
			  ]
			},
			{
				"collectionGroup": "orders",
				"queryScope": "COLLECTION",
				"fields": [
				{
					"fieldPath": "status",
					"order": "ASCENDING"
				},
				{
					"fieldPath": "latest",
					"order": "ASCENDING"
				}
			  ]
			},
			{
				"collectionGroup": "orders",
				"queryScope": "COLLECTION",
				"fields": [
				{
					"fieldPath": "status",
					"order": "ASCENDING"
				},
				{
					"fieldPath": "oldest",
					"order": "ASCENDING"
				}
			  ]
			},
			{
				"collectionGroup": "orders",
				"queryScope": "COLLECTION",
				"fields": [
				{
					"fieldPath": "title",
					"order": "ASCENDING"
				},
				{
					"fieldPath": "latest",
					"order": "ASCENDING"
				}

			  ]
			},
			{
				"collectionGroup": "orders",
				"queryScope": "COLLECTION",
				"fields": [
				{
					"fieldPath": "title",
					"order": "ASCENDING"
				},
				{
					"fieldPath": "oldest",
					"order": "ASCENDING"
				}

			  ]
			},
			{
				"collectionGroup": "orders",
				"queryScope": "COLLECTION",
				"fields": [
				{
					"fieldPath": "title",
					"arrayConfig": "CONTAINS"
				},
				{
					"fieldPath": "latest",
					"order": "ASCENDING"
				}
			  ]
			}
		],
		"fieldOverrides": []
	}

After that, run `firebase deploy` to deploy the security rules and indexes to your remote Firestore database.

### Sanity IO
Please read the official Sanity documentation to get started with Sanity IO's headless CMS:
[Get Started with Sanity IO](https://www.sanity.io/docs/getting-started)

Your Sanity project's client configuration is saved in `src/lib/config/app.js` file.

Using Schemas given in `sanity/schemas` directory under this project, run `sanity deploy`
> Make sure you create an API Token for Editor from your project's settings and include it in your `clientConfig` object and manage `CORS` to include your development domain.
> Also, add your remote Sanity Studio's URL in your local `.env` file as `VITE_SANITY_STUDIO_URL` variable

### Run Script
You are almost done with configuring your project and the rest will be taken care of by the `configure` script in your `package.json` file, which populates your Firestore database and content from your Sanity CMS with dummy data stored in `src/scripts/dummy.js` file.

    npm run configure

_(This step is mandatory too as it also saves some settings required to run your app)_

## Start the development server
Everything is almost set up. In your `.env` file:

    VITE_BUSINESS_NAME=""
	VITE_SANITY_STUDIO_URL=""
	VITE_CURRENCY="PKR"
	VITE_UID=""
	VITE_EMBED_LOCATION_SRC="" # Head over to maps.google.com
	VITE_FACEBOOK_PAGE=""
	VITE_FACEBOOK_PAGE_ID=""
	VITE_INSTAGRAM_PAGE=""
	VITE_CONTACT_EMAIL=""
	VITE_CONTACT_PHONE=""
You can leave `VITE_FACEBOOK_PAGE_ID` blank for now. *(This is used to let visitors talk to you using the Messenger widget on your website. More on that later)* 

Finally, you can launch the development server:

    npm run dev
Edit the source files accordingly for your business and then, you can run tests on it using `cypress`

## Testing with Cypress
To install Cypress locally or write your own tests, read their official documentation:
[Getting Started with Cypress](https://docs.cypress.io/guides/getting-started/)

Some basic API and UI tests are included in `cypress/integration` in the root of your project. 

To run the API tests:

    npm run test:api
   
  To ensure, your app flow behave as expected from beginning to end with E2E tests:
  

    npm run test
   
> In `cypress.json` file in the root of your project, add a real `admin_email` and `admin_password` to emulate real-user behavior. Also, change the `base_url` in case you are running your app on a different port.

## Deploy using Vercel
After making sure, everything works as intended, you can use the `vercel` CLI or sign in to their website and connect to GitHub/GitLab for automatic future deployment with one-click deploy.
[Read More](https://vercel.com/docs/concepts/deployments/overview) 

## Finishing Up
- ### Messenger Chat Widget
Last but not least, set up the messenger chat widget for your website following this tutorial:
[Adding Facebook Messenger to your Website](https://respond.io/blog/add-messenger-to-website#))
> Messenger Widget has already been added to your app's source code. You just need to enable it from your Facebook's page settings and add your website's domain name to it. After that, copy your PAGE ID and paste it in the `VITE_FACEBOOK_PAGE_ID` environment variable in `.env` file in your project.

- ### Progressive Web App
In `static/manifest.json` file, You can change your app's name and the way it registers as an app on mobile devices to give it a native app's look and experience. Also, replace the icons and `favicon.png` in `static` folder with the ones you have designed for your business.