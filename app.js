const { google } = require('googleapis') 
const path = require('path')
const fs = require('fs')


const CLIENT_ID = '1087987610439-ieo14pn4k9sk73qsp0afog22ju325iq8.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04vHEoxTT7sUuCgYIARAAGAQSNwF-L9Ir5_bnkpkA2IgIWVBRQqQ28Cuyha6UrJENSMuaY_GS1wTbV_mjBKoQZ_0J433U35XeWfQ'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,  
    REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'test.png')

async function uploadFile(){
    try{
 
        const respon = await drive.files.create({
            requestBody: {
                name: 'thisistest.png',
                mimeType: 'image/png'
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath)
            }
        })
        console.log(respon.data);

    } catch (error){
        console.log(error.message);
    }
}

 uploadFile()

// how to  delete file

async function deleteFile(){
    try{
        const reaspon = await drive.files.delete({
            //需要動態取得上傳文件id，並存進程式裡面
            fileId:'1h-jglssqRJ_5bQ6pVYwuvvfkEsonb9vt',
        })
        console.log(reaspon.data, reaspon.status)
    } catch (error) {
        console.log(error);
    }
}

// deleteFile()

// create pubilc URL
async function generatePublicUrl(){
     try {
          const fileId = '1vU1vQlvOmHe7IbfaV4-JeIpVrtJGLaEb'
          await drive.permissions.create({
              fileId: fileId,
              requestBody: {
              role: 'reader',
              type:'anyone'
              }
          })
          const result = await drive.files.get({
              fileId: fileId,
              fields: 'webViewLink, webContentLink'
              // webContentLink是可以下載的連結 
          })
          console.log(result.data)
     } catch (error) {
         console.log(error.message)
     }
}

generatePublicUrl()