# Biblio (capstone)

Biblio is a book sharing app that allows users easy access to any eBook that has been uploaded to the app.

Biblio uses a Rails backend and a React frontend. It also implements Epub.js which is a JavaScript library for rendering eBooks in the browser. Filestack, a third party file host website, is used to store uploaded eBooks.

Demo Video : https://youtu.be/P6TbApgP_oM
# Login and Registering

New users are required to required to register with a username and password. Once logged in users have access to libraries and books uploaded by all other users.

# Uploading

The React Filestack component is used to upload books to the app. To upload, users input the title, author, and a cover image url of a book and then select the eBook in ePub format that they would like to upload from their computer. Once successfully uploaded, the book is available to all other users.

# Libraries

Users can create, delete, and browse other libraries created by other users. Books can be added to libraries that the user has created. Users can search through existing libraries by the name of the library. Upon registering, all users have a library named "Your Uploads" in which they can keep track of books they have uploaded and also delete them if they wish.

# Reading in browser

Books can be rendered in the browser and users can read any book that has been uploaded by all other users.
