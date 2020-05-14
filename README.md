## Kytra presents a Galvanize Donation Tracker for Adopt-a-Classroom COVID-19 relief
---
### _Why Does This Exist?_

_I created this webpage for tracking pledges and fully paid donations from Galvanize employees across the US as they
gave from their hearts to support Adopt-a-Classroom during the COVID-19 relief drive._

---
### Description:

This web application is powered by React with Hooks, D3.js, Node.js (Express) and AWS RDS (mySQL).

The website uses the D3 data visualization library to depict verbal commitments vs. fully paid donations using an
Arc Graph.  The webpage updates in real-time as donations are added to my AWS RDS database built with mySQL.  The donation
tracker is dockerized and deployed to AWS EC2 using ElasticBeanstalk and can be viewed directly at:
[Kytra & Galvanize Donation Tracker](http://kytra-galvanize-aac-tracker.us-west-2.elasticbeanstalk.com/)


<img src="/public/img/KytraDonationTrackerDemo.gif?raw=true" width="800px">

[Kytra Donation Tracker Demo GIF](https://i.imgur.com/LZqsKSN.gifv)

## Additional Developer Thoughts:
While I will never turn down an opportunity to use React with Hooks, D3.js was easily one of my favorite parts of this 
project.  Learning how to display the Arc Gauge with css customizations to
"brand" it with the Galvanize company theming was immensely fun and I look forward to more opportunities to work with the
D3.js library using real-time updated data.

Coming in a close second place is the AWS RDS platform.  Working with security groups and launching my local database to 
the cloud was an incredibly rewarding feeling.  Using mySQL workbench on my local machine, I have full control over my
deployed RDS database.  It feels great knowing I can allow the end user access to the web application and their submissions
are updated in real-time.

## FEEL FREE TO POKE AROUND THE DEPLOYED SITE AND ADD YOUR OWN ENTRIES.  THE DONATION DRIVE HAS CONCLUDED!

