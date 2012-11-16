//  Title: Diffusion Limited Aggregation
//  Description: Tiles the entire image with quad-symmetric tiles sampled from the input image to create a wallpaper.
//  Date Started: Nov 2012
//  Last Modified: Nov 2012
//  http://www.asymptoticdesign.org/
//  This work is licensed under a Creative Commons 3.0 License.
//  (Attribution - NonCommerical - ShareAlike)
//  http://creativecommons.org/licenses/by-nc-sa/3.0/
//
//  In summary, you are free to copy, distribute, edit, and remix the work.
//  Under the conditions that you attribute the work to me, it is for
//  noncommercial purposes, and if you build upon this work or otherwise alter
//  it, you may only distribute the resulting work under this license.
//
//  Of course, the conditions may be waived with permission from the author.

//-----------------Globals


//-----------------Setup
void setup() {
  size(1024,683);
  //size(550,368);
  //load image
  sourceImage=loadImage("leaves2.jpg");
  image(sourceImage,0,0);
}

//-----------------Main Loop
void draw() {
 
}

//-----------------Defined Functions

