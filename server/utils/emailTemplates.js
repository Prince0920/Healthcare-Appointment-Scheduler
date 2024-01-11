const RegistrationMailContent = (mailInfo) => {
  console.log('mailInfo', mailInfo);

  return `
      <!DOCTYPE html>
      <html>
      <body>
  
      <!--HEADER/BANNER START-->
        <p align=center><img style="border=0 hspace=0 alt="Email Banner" align=baseline src="https://i.postimg.cc/fRpzHf5q/health.png" height="150" width="150"></p>
        <div style="max-width: 600px; width: 100%; margin-left: auto; margin-right: auto;" align=center>

      </div>
  
      <!--HEADER/BANNER END-->
        <!--CONTENT OF BODY START-->
        <div align=center>
        <table style="max-width: 600px; margin-left: auto; width: 100%; margin-right: auto" cellSpacing=0 cellPadding=0 align=center>
        <tbody>
        <tr>
        <td style="max-width: 600px; height: 350px; padding-bottom: 10px; text-align: left; padding-top: 75px; padding-left: 20px; padding-right: 20px; width: 100%; background-color: #fcfcfc; margin-left: auto; margin-right: auto;" vAlign=top>
        Dear, ${mailInfo.username ? mailInfo.username : ''}
        <br/>
        <br/>
         Thank you for registarion on HealthCare.
        <br/>
        <br/>
        Your registration has been completes successfully , now you can login on site.
      <br/>
        Sincerely,
      <br/>
        <p>Health Care Team</p>
        </td>
        </tr>
  
      <!--CONTENT OF BODY END-->
        <!--FOOTER START-->
      <tr>
       <td style="height: 135px; text-align: center; margin-top: 25px; background-color: #2a2a2a">
       <span style="color: #c3c3c3">
       <br/>
        <u>www.healthcare.com</u></a>
        <br/>
         A Demo project developed by Pankaj sir Team.
        <br/>
        1600 Pennsylvania Ave NW
        <br/>
        Washington, DC 20500
        <br/>
        <br/>
        </span>
  
      <!--SOCIAL OUTLETS START-->
        <span><a href="https://www.facebook.com/YourFaceBookPage"><img style="border: 0px; margin-right: 5px; margin-bottom: 10px; opacity: 0.9" alt=Facebook title=Facebook src="http://trailblz.info/license/images/fb-35x35-pixels.png" /></a>
        </span>
        <span><a href="https://www.twitter.com/YourTwitterPage"><img style="border: 0px; margin-left: 5px; margin-bottom: 10px; opacity: 0.9" alt=Twitter title=Twitter src="http://trailblz.info/license/images/twitter-35x35-pixels.png" /></a>
        </span>
        <!--SOCIAL OUTLETS END-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--FOOTER END-->
        </div>  
      </body>
        </html>
    `;
};

//  Book a appointment email template
const BookAppoEmailToDoc = (mailInfo) => {
  return `
    <!DOCTYPE html>
    <html>
    <body>

    <!--HEADER/BANNER START-->
      <p align=center><img style="border=0 hspace=0 alt="Email Banner" align=baseline src="https://i.postimg.cc/fRpzHf5q/health.png" height="150" width="150"></p>
      <div style="max-width: 600px; width: 100%; margin-left: auto; margin-right: auto;" align=center>

    </div>

    <!--HEADER/BANNER END-->
      <!--CONTENT OF BODY START-->
      <div align=center>
      <table style="max-width: 600px; margin-left: auto; width: 100%; margin-right: auto" cellSpacing=0 cellPadding=0 align=center>
      <tbody>
      <tr>
      <td style="max-width: 600px; height: 350px; padding-bottom: 10px; text-align: left; padding-top: 75px; padding-left: 20px; padding-right: 20px; width: 100%; background-color: #fcfcfc; margin-left: auto; margin-right: auto;" vAlign=top>
      Hi,Dr. ${mailInfo.username}
      <br/>
      <br/>
       A patient has been requested to book a appoitments with following details:
      <br/>
      <br/>
      Name:
    <br/>
      Sincerely,
    <br/>
      <p>Health Care Team</p>
      </td>
      </tr>

    <!--CONTENT OF BODY END-->
      <!--FOOTER START-->
    <tr>
     <td style="height: 135px; text-align: center; margin-top: 25px; background-color: #2a2a2a">
     <span style="color: #c3c3c3">
     <br/>
      <u>www.healthcare.com</u></a>
      <br/>
       A Demo project developed by Pankaj sir Team.
      <br/>
      1600 Pennsylvania Ave NW
      <br/>
      Washington, DC 20500
      <br/>
      <br/>
      </span>

    <!--SOCIAL OUTLETS START-->
      <span><a href="https://www.facebook.com/YourFaceBookPage"><img style="border: 0px; margin-right: 5px; margin-bottom: 10px; opacity: 0.9" alt=Facebook title=Facebook src="http://trailblz.info/license/images/fb-35x35-pixels.png" /></a>
      </span>
      <span><a href="https://www.twitter.com/YourTwitterPage"><img style="border: 0px; margin-left: 5px; margin-bottom: 10px; opacity: 0.9" alt=Twitter title=Twitter src="http://trailblz.info/license/images/twitter-35x35-pixels.png" /></a>
      </span>
      <!--SOCIAL OUTLETS END-->
      </td>
      </tr>
      </tbody>
      </table>
      <!--FOOTER END-->
      </div>  
    </body>
      </html>
  `;
};

module.exports = { RegistrationMailContent, BookAppoEmailToDoc };
