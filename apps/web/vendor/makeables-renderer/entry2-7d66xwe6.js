function G(C,D,f,E,F=!1){if(F)return[f,0];let q=C,b=D,w=Math.max(0,Math.min(E,0.05)),z=Math.max(1,Math.ceil(w*120));for(let B=0;B<z;B++)b+=((f-q)*100-b*17)*w/z,q+=b*w/z;return Math.abs(f-q)<0.0002&&Math.abs(b)<0.001?[f,0]:[q,b]}
export{G as ca};
