import { toRGBA } from "./Conversions.js";

/**
 * 
 * @param {number[]} rgba_old 
 * @param {number[]} rgba_new 
 * @returns {number[]}
 */
export function alphaBlend(rgba_old, rgba_new) {
  const COLOR_1 = rgba_new; // Background (Bottom layer)
  const COLOR_2 = rgba_old; // Foreground (Top layer)

  const a1 = COLOR_1[3] / 255;
  const a2 = COLOR_2[3] / 255;

  const ALPHA_OUT = a1 + a2 * (1 - a1);

  if (ALPHA_OUT === 0) {
    return [0,0,0,0];
  }

  const r_out = (COLOR_1[0] * a1 + COLOR_2[0] * a2 * (1 - a1)) / ALPHA_OUT;
  const g_out = (COLOR_1[1] * a1 + COLOR_2[1] * a2 * (1 - a1)) / ALPHA_OUT;
  const b_out = (COLOR_1[2] * a1 + COLOR_2[2] * a2 * (1 - a1)) / ALPHA_OUT;

  return [
    Math.round(r_out),
    Math.round(g_out),
    Math.round(b_out),
    Math.round(ALPHA_OUT * 255)
  ];
}


/** 
* @param {number []} rgba1
* @param {number []} rgba2
* @param {bool} useAlpha
* @return {number} 
**/
export function colorSimilarity(rgba1,rgba2,useAlpha){
  const channel = useAlpha?4:3; 
  let result = 0;
  for(let i = 0;i< channel;i++){
    result += Math.abs(rgba1[i]-rgba2[i]); 

  }
  return 1-result/(channel*255);
}

/*
const r = 1-Math.abs(R1-R2)/255
const g = 1-Math.abs(G1-G2)/255
const b = 1-Math.abs(B1-B2)/255
if(alpha) return (1-Math.abs(A1-A2)/255)+r+g+b)/4

return (r+g+b)/3
*/


export function mix(a, b, t) {
  return [
      Math.round(a[0] * (1 - t) + b[0] * t),
      Math.round(a[1] * (1 - t) + b[1] * t),
      Math.round(a[2] * (1 - t) + b[2] * t),
      Math.round(a[3] * (1 - t) + b[3] * t),
  ];
}
/*

Add

Adds the channels together.

R = A.r + B.r
G = A.g + B.g
B = A.b + B.b

Then clamp to 255.

Example:

(100,50,200)
+
(80,100,40)
=
(180,150,240)

If it exceeds 255:

200 + 100 = 300

becomes

255

Useful for adding light.

Subtract

Subtracts the second color.

R = A.r - B.r

Clamp to 0.

Example:

(100,50,200)
-
(80,100,40)
=
(20,0,160)

Useful for removing color.

Multiply

Treat colors as percentages.

Formula:

result = A * B / 255

Example:

100 * 80 / 255 ≈ 31
50 * 100 / 255 ≈ 20
200 * 40 / 255 ≈ 31

Result:

(31,20,31)

This always makes colors darker.

Screen

The opposite of Multiply.

Formula:

255 - ((255-A)*(255-B))/255

Example:

A = 100
B = 80

255 - (155*175)/255
≈ 149

This always makes colors lighter.

Used for light effects, glows, and highlights.

Overlay

Uses Multiply for dark pixels and Screen for bright pixels.

Pseudo-code:

if (A < 128)
    result = 2*A*B/255;
else
    result = 255 - 2*(255-A)*(255-B)/255;

Produces higher contrast.

Very common in Photoshop and image editors.

Difference

Computes the absolute difference.

result = abs(A - B)

Example:

(100,50,200)

(80,100,40)

↓

(20,50,160)

Black means the colors are identical.

Useful for image comparison.

Mix (Linear Interpolation)

Blends between two colors.

result = A*(1-t) + B*t

Example:

A = Red
B = Blue

t = 0.0 → Red
t = 0.5 → Purple
t = 1.0 → Blue

This is probably the most useful function in a color utility library.
*/