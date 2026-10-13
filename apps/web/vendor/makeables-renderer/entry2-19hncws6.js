var WZ="186";var ZZ=0,qQ=1,KZ=2;var W7=1,HZ=2,A8=3,C8=0,TJ=1,H9=2,Y9=0,Z7=1,FQ=2,DQ=3,OQ=4,YZ=5;var w8=100,XZ=101,UZ=102,GZ=103,NZ=104,EZ=200,qZ=201,FZ=202,DZ=203,OZ=204,RZ=205,MZ=206,kZ=207,LZ=208,VZ=209,BZ=210,IZ=211,zZ=212,AZ=213,CZ=214,wZ=0,_Z=1,PZ=2,RQ=3,TZ=4,SZ=5,jZ=6,yZ=7,vZ=0,fZ=1,hZ=2,aJ=0,MQ=1,kQ=2,LQ=3,VQ=4,BQ=5,IQ=6,zQ=7;var _8=301,d9=302,J6=303,Q6=304,K7=306,bZ=1000,$6=1001,xZ=1002,S9=1003,gZ=1004;var H7=1005;var fJ=1006,W6=1007;var l9=1008;var rJ=1009,pZ=1010,mZ=1011,Y7=1012,AQ=1013,j9=1014,k9=1015,X9=1016,CQ=1017,wQ=1018,P8=1020,dZ=35902,lZ=35899,uZ=1021,cZ=1022,U9=1023,u9=1026,c9=1027,nZ=1028,_Q=1029,n9=1030,PQ=1031;var TQ=1033,Z6=33776,K6=33777,H6=33778,Y6=33779,SQ=35840,jQ=35841,yQ=35842,vQ=35843,fQ=36196,hQ=37492,bQ=37496,xQ=37488,gQ=37489,X6=37490,pQ=37491,mQ=37808,dQ=37809,lQ=37810,uQ=37811,cQ=37812,nQ=37813,sQ=37814,iQ=37815,oQ=37816,aQ=37817,rQ=37818,tQ=37819,eQ=37820,J$=37821,Q$=36492,$$=36494,W$=36495,Z$=36283,K$=36284,U6=36285,H$=36286;var Y$=0,sZ=1,s9="",iZ="srgb",X$="srgb-linear",U$="linear",NJ="srgb";var oZ=512,aZ=513,rZ=514,G6=515,tZ=516,eZ=517,N6=518,JK=519;var G$="300 es",N$=2000;function FH(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function DH(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function r8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function QK(){let J=r8("canvas");return J.style.display="block",J}var kW={},B8=null;function t8(...J){let Q="THREE."+J.shift();if(B8)B8("log",Q,...J);else console.log(Q,...J)}function $K(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function f0(...J){J=$K(J);let Q="THREE."+J.shift();if(B8)B8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function x0(...J){J=$K(J);let Q="THREE."+J.shift();if(B8)B8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function p9(...J){let Q=J.join(" ");if(Q in kW)return;kW[Q]=!0,f0(...J)}function WK(J,Q,$){return new Promise(function(W,Z){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:Z();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:W()}}setTimeout(K,$)})}var ZK={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class L9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let W=$[J];if(W!==void 0){let Z=W.indexOf(Q);if(Z!==-1)W.splice(Z,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let W=$.slice(0);for(let Z=0,K=W.length;Z<K;Z++)W[Z].call(this,J);J.target=null}}}var _J=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],LW=1234567,s8=Math.PI/180,I8=180/Math.PI;function Z9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(_J[J&255]+_J[J>>8&255]+_J[J>>16&255]+_J[J>>24&255]+"-"+_J[Q&255]+_J[Q>>8&255]+"-"+_J[Q>>16&15|64]+_J[Q>>24&255]+"-"+_J[$&63|128]+_J[$>>8&255]+"-"+_J[$>>16&255]+_J[$>>24&255]+_J[W&255]+_J[W>>8&255]+_J[W>>16&255]+_J[W>>24&255]).toLowerCase()}function s0(J,Q,$){return Math.max(Q,Math.min($,J))}function E$(J,Q){return(J%Q+Q)%Q}function OH(J,Q,$,W,Z){return W+(J-Q)*(Z-W)/($-Q)}function RH(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function i8(J,Q,$){return(1-$)*J+$*Q}function MH(J,Q,$,W){return i8(J,Q,1-Math.exp(-$*W))}function kH(J,Q=1){return Q-Math.abs(E$(J,Q*2)-Q)}function LH(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function VH(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function BH(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function IH(J,Q){return J+Math.random()*(Q-J)}function zH(J){return J*(0.5-Math.random())}function AH(J){if(J!==void 0)LW=J;let Q=LW+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function CH(J){return J*s8}function wH(J){return J*I8}function _H(J){return J>0&&Number.isInteger(J)&&2**Math.round(Math.log2(J))===J}function PH(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function TH(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function SH(J,Q,$,W,Z){let{cos:K,sin:H}=Math,Y=K($/2),X=H($/2),U=K((Q+W)/2),N=H((Q+W)/2),E=K((Q-W)/2),G=H((Q-W)/2),D=K((W-Q)/2),R=H((W-Q)/2);switch(Z){case"XYX":J.set(Y*N,X*E,X*G,Y*U);break;case"YZY":J.set(X*G,Y*N,X*E,Y*U);break;case"ZXZ":J.set(X*E,X*G,Y*N,Y*U);break;case"XZX":J.set(Y*N,X*R,X*D,Y*U);break;case"YXY":J.set(X*D,Y*N,X*R,Y*U);break;case"ZYZ":J.set(X*R,X*D,Y*N,Y*U);break;default:f0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+Z)}}function oJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function HJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var jH={DEG2RAD:s8,RAD2DEG:I8,generateUUID:Z9,clamp:s0,euclideanModulo:E$,mapLinear:OH,inverseLerp:RH,lerp:i8,damp:MH,pingpong:kH,smoothstep:LH,smootherstep:VH,randInt:BH,randFloat:IH,randFloatSpread:zH,seededRandom:AH,degToRad:CH,radToDeg:wH,isPowerOfTwo:_H,ceilPowerOfTwo:PH,floorPowerOfTwo:TH,setQuaternionFromProperEuler:SH,normalize:HJ,denormalize:oJ};class Y0{static{Y0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6],this.y=W[1]*Q+W[4]*$+W[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=s0(this.x,J.x,Q.x),this.y=s0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=s0(this.x,J,Q),this.y=s0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(s0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(s0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=this.x-J.x,K=this.y-J.y;return this.x=Z*$-K*W+J.x,this.y=Z*W+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class V9{constructor(J=0,Q=0,$=0,W=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=W}static slerpFlat(J,Q,$,W,Z,K,H){let Y=$[W+0],X=$[W+1],U=$[W+2],N=$[W+3],E=Z[K+0],G=Z[K+1],D=Z[K+2],R=Z[K+3];if(N!==R||Y!==E||X!==G||U!==D){let B=Y*E+X*G+U*D+N*R;if(B<0)E=-E,G=-G,D=-D,R=-R,B=-B;let F=1-H;if(B<0.9995){let q=Math.acos(B),A=Math.sin(q);F=Math.sin(F*q)/A,H=Math.sin(H*q)/A,Y=Y*F+E*H,X=X*F+G*H,U=U*F+D*H,N=N*F+R*H}else{Y=Y*F+E*H,X=X*F+G*H,U=U*F+D*H,N=N*F+R*H;let q=1/Math.sqrt(Y*Y+X*X+U*U+N*N);Y*=q,X*=q,U*=q,N*=q}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,W,Z,K){let H=$[W],Y=$[W+1],X=$[W+2],U=$[W+3],N=Z[K],E=Z[K+1],G=Z[K+2],D=Z[K+3];return J[Q]=H*D+U*N+Y*G-X*E,J[Q+1]=Y*D+U*E+X*N-H*G,J[Q+2]=X*D+U*G+H*E-Y*N,J[Q+3]=U*D-H*N-Y*E-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,W){return this._x=J,this._y=Q,this._z=$,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:W,_z:Z,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(W/2),N=H(Z/2),E=Y($/2),G=Y(W/2),D=Y(Z/2);switch(K){case"XYZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"YXZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"ZXY":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"ZYX":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"YZX":this._x=E*U*N+X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N-E*G*D;break;case"XZY":this._x=E*U*N-X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N+E*G*D;break;default:f0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,W=Math.sin($);return this._x=J.x*W,this._y=J.y*W,this._z=J.z*W,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],W=Q[4],Z=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],N=Q[10],E=$+H+N;if(E>0){let G=0.5/Math.sqrt(E+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(Z-X)*G,this._z=(K-W)*G}else if($>H&&$>N){let G=2*Math.sqrt(1+$-H-N);this._w=(U-Y)/G,this._x=0.25*G,this._y=(W+K)/G,this._z=(Z+X)/G}else if(H>N){let G=2*Math.sqrt(1+H-$-N);this._w=(Z-X)/G,this._x=(W+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+N-$-H);this._w=(K-W)/G,this._x=(Z+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(s0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let W=Math.min(1,Q/$);return this.slerp(J,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+W*X-Z*Y,this._y=W*U+K*Y+Z*H-$*X,this._z=Z*U+K*X+$*Y-W*H,this._w=K*U-$*H-W*Y-Z*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=this.dot(J);if(H<0)$=-$,W=-W,Z=-Z,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),W=Math.sqrt(1-$),Z=Math.sqrt($);return this.set(W*Math.sin(J),W*Math.cos(J),Z*Math.sin(Q),Z*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class S{static{S.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(VW.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(VW.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6]*W,this.y=Z[1]*Q+Z[4]*$+Z[7]*W,this.z=Z[2]*Q+Z[5]*$+Z[8]*W,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements,K=1/(Z[3]*Q+Z[7]*$+Z[11]*W+Z[15]);return this.x=(Z[0]*Q+Z[4]*$+Z[8]*W+Z[12])*K,this.y=(Z[1]*Q+Z[5]*$+Z[9]*W+Z[13])*K,this.z=(Z[2]*Q+Z[6]*$+Z[10]*W+Z[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,W=this.z,Z=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*W-H*$),U=2*(H*Q-Z*W),N=2*(Z*$-K*Q);return this.x=Q+Y*X+K*N-H*U,this.y=$+Y*U+H*X-Z*N,this.z=W+Y*N+Z*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[4]*$+Z[8]*W,this.y=Z[1]*Q+Z[5]*$+Z[9]*W,this.z=Z[2]*Q+Z[6]*$+Z[10]*W,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=s0(this.x,J.x,Q.x),this.y=s0(this.y,J.y,Q.y),this.z=s0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=s0(this.x,J,Q),this.y=s0(this.y,J,Q),this.z=s0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(s0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:W,z:Z}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=W*Y-Z*H,this.y=Z*K-$*Y,this.z=$*H-W*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return x6.copy(this).projectOnVector(J),this.sub(x6)}reflect(J){return this.sub(x6.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(s0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,W=this.z-J.z;return Q*Q+$*$+W*W}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let W=Math.sin(Q)*J;return this.x=W*Math.sin($),this.y=Math.cos(Q)*J,this.z=W*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),W=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=W,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var x6=new S,VW=new V9;class g0{static{g0.prototype.isMatrix3=!0}constructor(J,Q,$,W,Z,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X)}set(J,Q,$,W,Z,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=W,U[2]=H,U[3]=Q,U[4]=Z,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],N=$[7],E=$[2],G=$[5],D=$[8],R=W[0],B=W[3],F=W[6],q=W[1],A=W[4],C=W[7],L=W[2],z=W[5],w=W[8];return Z[0]=K*R+H*q+Y*L,Z[3]=K*B+H*A+Y*z,Z[6]=K*F+H*C+Y*w,Z[1]=X*R+U*q+N*L,Z[4]=X*B+U*A+N*z,Z[7]=X*F+U*C+N*w,Z[2]=E*R+G*q+D*L,Z[5]=E*B+G*A+D*z,Z[8]=E*F+G*C+D*w,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*Z*U+$*H*Y+W*Z*X-W*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=U*K-H*X,E=H*Y-U*Z,G=X*Z-K*Y,D=Q*N+$*E+W*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/D;return J[0]=N*R,J[1]=(W*X-U*$)*R,J[2]=(H*$-W*K)*R,J[3]=E*R,J[4]=(U*Q-W*Y)*R,J[5]=(W*Z-H*Q)*R,J[6]=G*R,J[7]=($*Y-X*Q)*R,J[8]=(K*Q-$*Z)*R,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,W,Z,K,H){let Y=Math.cos(Z),X=Math.sin(Z);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-W*X,W*Y,-W*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return p9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(g6.makeScale(J,Q)),this}rotate(J){return p9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(g6.makeRotation(-J)),this}translate(J,Q){return p9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(g6.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<9;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var g6=new g0,BW=new g0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),IW=new g0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function yH(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Z,K,H){if(this.enabled===!1||K===H||!K||!H)return Z;if(this.spaces[K].transfer==="srgb")Z.r=M9(Z.r),Z.g=M9(Z.g),Z.b=M9(Z.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)Z.applyMatrix3(this.spaces[K].toXYZ),Z.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Z.r=V8(Z.r),Z.g=V8(Z.g),Z.b=V8(Z.b);return Z},workingToColorSpace:function(Z,K){return this.convert(Z,this.workingColorSpace,K)},colorSpaceToWorking:function(Z,K){return this.convert(Z,K,this.workingColorSpace)},getPrimaries:function(Z){return this.spaces[Z].primaries},getTransfer:function(Z){if(Z==="")return"linear";return this.spaces[Z].transfer},getToneMappingMode:function(Z){return this.spaces[Z].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Z,K=this.workingColorSpace){return Z.fromArray(this.spaces[K].luminanceCoefficients)},define:function(Z){Object.assign(this.spaces,Z)},_getMatrix:function(Z,K,H){return Z.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Z){return this.spaces[Z].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Z=this.workingColorSpace){return this.spaces[Z].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Z,K){return p9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(Z,K)},toWorkingColorSpace:function(Z,K){return p9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(Z,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:W,transfer:"linear",toXYZ:BW,fromXYZ:IW,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:W,transfer:"srgb",toXYZ:BW,fromXYZ:IW,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var r0=yH();function M9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function V8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var $8;class q${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if($8===void 0)$8=r8("canvas");$8.width=J.width,$8.height=J.height;let W=$8.getContext("2d");if(J instanceof ImageData)W.putImageData(J,0,0);else W.drawImage(J,0,0,J.width,J.height);$=$8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=r8("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let W=$.getImageData(0,0,J.width,J.height),Z=W.data;for(let K=0;K<Z.length;K++)Z[K]=M9(Z[K]/255)*255;return $.putImageData(W,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(M9(Q[$]/255)*255);else Q[$]=M9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return f0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var vH=0;class X7{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vH++}),this.uuid=Z9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},W=this.data;if(W!==null){let Z;if(Array.isArray(W)){Z=[];for(let K=0,H=W.length;K<H;K++)if(W[K].isDataTexture)Z.push(p6(W[K].image));else Z.push(p6(W[K]))}else Z=p6(W);$.url=Z}if(!Q)J.images[this.uuid]=$;return $}}function p6(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return q$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return f0("Texture: Unable to serialize Texture."),{}}var fH=0,m6=new S;class CJ extends L9{constructor(J=CJ.DEFAULT_IMAGE,Q=CJ.DEFAULT_MAPPING,$=1001,W=1001,Z=1006,K=1008,H=1023,Y=1009,X=CJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:fH++}),this.uuid=Z9(),this.name="",this.source=new X7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=W,this.magFilter=Z,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new Y0(0,0),this.repeat=new Y0(1,1),this.center=new Y0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new g0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(m6).x}get height(){return this.source.getSize(m6).y}get depth(){return this.source.getSize(m6).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){f0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){f0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(W&&$&&(W.isVector2&&$.isVector2))W.copy($);else if(W&&$&&(W.isVector3&&$.isVector3))W.copy($);else if(W&&$&&(W.isMatrix3&&$.isMatrix3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}CJ.DEFAULT_IMAGE=null;CJ.DEFAULT_MAPPING=300;CJ.DEFAULT_ANISOTROPY=1;class DJ{static{DJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,W=1){this.x=J,this.y=Q,this.z=$,this.w=W}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,W){return this.x=J,this.y=Q,this.z=$,this.w=W,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*W+K[12]*Z,this.y=K[1]*Q+K[5]*$+K[9]*W+K[13]*Z,this.z=K[2]*Q+K[6]*$+K[10]*W+K[14]*Z,this.w=K[3]*Q+K[7]*$+K[11]*W+K[15]*Z,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,W,Z,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],N=Y[8],E=Y[1],G=Y[5],D=Y[9],R=Y[2],B=Y[6],F=Y[10];if(Math.abs(U-E)<0.01&&Math.abs(N-R)<0.01&&Math.abs(D-B)<0.01){if(Math.abs(U+E)<0.1&&Math.abs(N+R)<0.1&&Math.abs(D+B)<0.1&&Math.abs(X+G+F-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let A=(X+1)/2,C=(G+1)/2,L=(F+1)/2,z=(U+E)/4,w=(N+R)/4,_=(D+B)/4;if(A>C&&A>L)if(A<0.01)$=0,W=0.707106781,Z=0.707106781;else $=Math.sqrt(A),W=z/$,Z=w/$;else if(C>L)if(C<0.01)$=0.707106781,W=0,Z=0.707106781;else W=Math.sqrt(C),$=z/W,Z=_/W;else if(L<0.01)$=0.707106781,W=0.707106781,Z=0;else Z=Math.sqrt(L),$=w/Z,W=_/Z;return this.set($,W,Z,Q),this}let q=Math.sqrt((B-D)*(B-D)+(N-R)*(N-R)+(E-U)*(E-U));if(Math.abs(q)<0.001)q=1;return this.x=(B-D)/q,this.y=(N-R)/q,this.z=(E-U)/q,this.w=Math.acos((X+G+F-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=s0(this.x,J.x,Q.x),this.y=s0(this.y,J.y,Q.y),this.z=s0(this.z,J.z,Q.z),this.w=s0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=s0(this.x,J,Q),this.y=s0(this.y,J,Q),this.z=s0(this.z,J,Q),this.w=s0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(s0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class F$ extends L9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new DJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new DJ(0,0,J,Q),this.textures=[];let W={width:J,height:Q,depth:$.depth},Z=new CJ(W),K=$.count;for(let H=0;H<K;H++)this.textures[H]=Z.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveColorBuffer=$.resolveColorBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this.storeMultisampledColorBuffer=$.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=$.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=$.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let W=0,Z=this.textures.length;W<Z;W++)if(this.textures[W].image.width=J,this.textures[W].image.height=Q,this.textures[W].image.depth=$,this.textures[W].isData3DTexture!==!0)this.textures[W].isArrayTexture=this.textures[W].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let W=Object.assign({},J.textures[Q].image);this.textures[Q].source=new X7(W)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pJ extends F${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class E6 extends CJ{constructor(J=null,Q=1,$=1,W=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class D$ extends CJ{constructor(J=null,Q=1,$=1,W=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class JJ{static{JJ.prototype.isMatrix4=!0}constructor(J,Q,$,W,Z,K,H,Y,X,U,N,E,G,D,R,B){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X,U,N,E,G,D,R,B)}set(J,Q,$,W,Z,K,H,Y,X,U,N,E,G,D,R,B){let F=this.elements;return F[0]=J,F[4]=Q,F[8]=$,F[12]=W,F[1]=Z,F[5]=K,F[9]=H,F[13]=Y,F[2]=X,F[6]=U,F[10]=N,F[14]=E,F[3]=G,F[7]=D,F[11]=R,F[15]=B,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new JJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,W=1/W8.setFromMatrixColumn(J,0).length(),Z=1/W8.setFromMatrixColumn(J,1).length(),K=1/W8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*W,Q[1]=$[1]*W,Q[2]=$[2]*W,Q[3]=0,Q[4]=$[4]*Z,Q[5]=$[5]*Z,Q[6]=$[6]*Z,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(W),X=Math.sin(W),U=Math.cos(Z),N=Math.sin(Z);if(J.order==="XYZ"){let E=K*U,G=K*N,D=H*U,R=H*N;Q[0]=Y*U,Q[4]=-Y*N,Q[8]=X,Q[1]=G+D*X,Q[5]=E-R*X,Q[9]=-H*Y,Q[2]=R-E*X,Q[6]=D+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let E=Y*U,G=Y*N,D=X*U,R=X*N;Q[0]=E+R*H,Q[4]=D*H-G,Q[8]=K*X,Q[1]=K*N,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-D,Q[6]=R+E*H,Q[10]=K*Y}else if(J.order==="ZXY"){let E=Y*U,G=Y*N,D=X*U,R=X*N;Q[0]=E-R*H,Q[4]=-K*N,Q[8]=D+G*H,Q[1]=G+D*H,Q[5]=K*U,Q[9]=R-E*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let E=K*U,G=K*N,D=H*U,R=H*N;Q[0]=Y*U,Q[4]=D*X-G,Q[8]=E*X+R,Q[1]=Y*N,Q[5]=R*X+E,Q[9]=G*X-D,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let E=K*Y,G=K*X,D=H*Y,R=H*X;Q[0]=Y*U,Q[4]=R-E*N,Q[8]=D*N+G,Q[1]=N,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*N+D,Q[10]=E-R*N}else if(J.order==="XZY"){let E=K*Y,G=K*X,D=H*Y,R=H*X;Q[0]=Y*U,Q[4]=-N,Q[8]=X*U,Q[1]=E*N+R,Q[5]=K*U,Q[9]=G*N-D,Q[2]=D*N-G,Q[6]=H*U,Q[10]=R*N+E}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(hH,J,bH)}lookAt(J,Q,$){let W=this.elements;if(hJ.subVectors(J,Q),hJ.lengthSq()===0)hJ.z=1;if(hJ.normalize(),C9.crossVectors($,hJ),C9.lengthSq()===0){if(Math.abs($.z)===1)hJ.x+=0.0001;else hJ.z+=0.0001;hJ.normalize(),C9.crossVectors($,hJ)}return C9.normalize(),B7.crossVectors(hJ,C9),W[0]=C9.x,W[4]=B7.x,W[8]=hJ.x,W[1]=C9.y,W[5]=B7.y,W[9]=hJ.y,W[2]=C9.z,W[6]=B7.z,W[10]=hJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],N=$[5],E=$[9],G=$[13],D=$[2],R=$[6],B=$[10],F=$[14],q=$[3],A=$[7],C=$[11],L=$[15],z=W[0],w=W[4],_=W[8],M=W[12],I=W[1],g=W[5],v=W[9],h=W[13],i=W[2],T=W[6],p=W[10],o=W[14],m=W[3],Z0=W[7],u=W[11],r=W[15];return Z[0]=K*z+H*I+Y*i+X*m,Z[4]=K*w+H*g+Y*T+X*Z0,Z[8]=K*_+H*v+Y*p+X*u,Z[12]=K*M+H*h+Y*o+X*r,Z[1]=U*z+N*I+E*i+G*m,Z[5]=U*w+N*g+E*T+G*Z0,Z[9]=U*_+N*v+E*p+G*u,Z[13]=U*M+N*h+E*o+G*r,Z[2]=D*z+R*I+B*i+F*m,Z[6]=D*w+R*g+B*T+F*Z0,Z[10]=D*_+R*v+B*p+F*u,Z[14]=D*M+R*h+B*o+F*r,Z[3]=q*z+A*I+C*i+L*m,Z[7]=q*w+A*g+C*T+L*Z0,Z[11]=q*_+A*v+C*p+L*u,Z[15]=q*M+A*h+C*o+L*r,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],N=J[6],E=J[10],G=J[14],D=J[3],R=J[7],B=J[11],F=J[15],q=Y*G-X*E,A=H*G-X*N,C=H*E-Y*N,L=K*G-X*U,z=K*E-Y*U,w=K*N-H*U;return Q*(R*q-B*A+F*C)-$*(D*q-B*L+F*z)+W*(D*A-R*L+F*w)-Z*(D*C-R*z+B*w)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(Z*U-H*Y)+W*(Z*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let W=this.elements;if(J.isVector3)W[12]=J.x,W[13]=J.y,W[14]=J.z;else W[12]=J,W[13]=Q,W[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=J[9],E=J[10],G=J[11],D=J[12],R=J[13],B=J[14],F=J[15],q=Q*H-$*K,A=Q*Y-W*K,C=Q*X-Z*K,L=$*Y-W*H,z=$*X-Z*H,w=W*X-Z*Y,_=U*R-N*D,M=U*B-E*D,I=U*F-G*D,g=N*B-E*R,v=N*F-G*R,h=E*F-G*B,i=q*h-A*v+C*g+L*I-z*M+w*_;if(i===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/i;return J[0]=(H*h-Y*v+X*g)*T,J[1]=(W*v-$*h-Z*g)*T,J[2]=(R*w-B*z+F*L)*T,J[3]=(E*z-N*w-G*L)*T,J[4]=(Y*I-K*h-X*M)*T,J[5]=(Q*h-W*I+Z*M)*T,J[6]=(B*C-D*w-F*A)*T,J[7]=(U*w-E*C+G*A)*T,J[8]=(K*v-H*I+X*_)*T,J[9]=($*I-Q*v-Z*_)*T,J[10]=(D*z-R*C+F*q)*T,J[11]=(N*C-U*z-G*q)*T,J[12]=(H*M-K*g-Y*_)*T,J[13]=(Q*g-$*M+W*_)*T,J[14]=(R*A-D*L-B*q)*T,J[15]=(U*L-N*A+E*q)*T,this}scale(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z;return Q[0]*=$,Q[4]*=W,Q[8]*=Z,Q[1]*=$,Q[5]*=W,Q[9]*=Z,Q[2]*=$,Q[6]*=W,Q[10]*=Z,Q[3]*=$,Q[7]*=W,Q[11]*=Z,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],W=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,W))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=1-$,K=J.x,H=J.y,Y=J.z,X=Z*K,U=Z*H;return this.set(X*K+$,X*H-W*Y,X*Y+W*H,0,X*H+W*Y,U*H+$,U*Y-W*K,0,X*Y-W*H,U*Y+W*K,Z*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,W,Z,K){return this.set(1,$,Z,0,J,1,K,0,Q,W,1,0,0,0,0,1),this}compose(J,Q,$){let W=this.elements,Z=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=Z+Z,U=K+K,N=H+H,E=Z*X,G=Z*U,D=Z*N,R=K*U,B=K*N,F=H*N,q=Y*X,A=Y*U,C=Y*N,L=$.x,z=$.y,w=$.z;return W[0]=(1-(R+F))*L,W[1]=(G+C)*L,W[2]=(D-A)*L,W[3]=0,W[4]=(G-C)*z,W[5]=(1-(E+F))*z,W[6]=(B+q)*z,W[7]=0,W[8]=(D+A)*w,W[9]=(B-q)*w,W[10]=(1-(E+R))*w,W[11]=0,W[12]=J.x,W[13]=J.y,W[14]=J.z,W[15]=1,this}decompose(J,Q,$){let W=this.elements;J.x=W[12],J.y=W[13],J.z=W[14];let Z=this.determinantAffine();if(Z===0)return $.set(1,1,1),Q.identity(),this;let K=W8.set(W[0],W[1],W[2]).length(),H=W8.set(W[4],W[5],W[6]).length(),Y=W8.set(W[8],W[9],W[10]).length();if(Z<0)K=-K;nJ.copy(this);let X=1/K,U=1/H,N=1/Y;return nJ.elements[0]*=X,nJ.elements[1]*=X,nJ.elements[2]*=X,nJ.elements[4]*=U,nJ.elements[5]*=U,nJ.elements[6]*=U,nJ.elements[8]*=N,nJ.elements[9]*=N,nJ.elements[10]*=N,Q.setFromRotationMatrix(nJ),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2*Z/(Q-J),N=2*Z/($-W),E=(Q+J)/(Q-J),G=($+W)/($-W),D,R;if(Y)D=Z/(K-Z),R=K*Z/(K-Z);else if(H===2000)D=-(K+Z)/(K-Z),R=-2*K*Z/(K-Z);else if(H===2001)D=-K/(K-Z),R=-K*Z/(K-Z);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=E,X[12]=0,X[1]=0,X[5]=N,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=D,X[14]=R,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),N=2/($-W),E=-(Q+J)/(Q-J),G=-($+W)/($-W),D,R;if(Y)D=1/(K-Z),R=K/(K-Z);else if(H===2000)D=-2/(K-Z),R=-(K+Z)/(K-Z);else if(H===2001)D=-1/(K-Z),R=-Z/(K-Z);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=E,X[1]=0,X[5]=N,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=D,X[14]=R,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<16;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var W8=new S,nJ=new JJ,hH=new S(0,0,0),bH=new S(1,1,1),C9=new S,B7=new S,hJ=new S,zW=new JJ,AW=new V9;class K9{constructor(J=0,Q=0,$=0,W=K9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=W}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,W=this._order){return this._x=J,this._y=Q,this._z=$,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let W=J.elements,Z=W[0],K=W[4],H=W[8],Y=W[1],X=W[5],U=W[9],N=W[2],E=W[6],G=W[10];switch(Q){case"XYZ":if(this._y=Math.asin(s0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,Z);else this._x=Math.atan2(E,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-s0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-N,Z),this._z=0;break;case"ZXY":if(this._x=Math.asin(s0(E,-1,1)),Math.abs(E)<0.9999999)this._y=Math.atan2(-N,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,Z);break;case"ZYX":if(this._y=Math.asin(-s0(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(E,G),this._z=Math.atan2(Y,Z);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(s0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-N,Z);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-s0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(E,X),this._y=Math.atan2(H,Z);else this._x=Math.atan2(-U,G),this._y=0;break;default:f0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return zW.makeRotationFromQuaternion(J),this.setFromRotationMatrix(zW,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return AW.setFromEuler(this),this.setFromQuaternion(AW,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}K9.DEFAULT_ORDER="XYZ";class U7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var xH=0,CW=new S,Z8=new V9,q9=new JJ,I7=new S,h8=new S,gH=new S,pH=new V9,wW=new S(1,0,0),_W=new S(0,1,0),PW=new S(0,0,1),TW={type:"added"},mH={type:"removed"},K8={type:"childadded",child:null},d6={type:"childremoved",child:null};class RJ extends L9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:xH++}),this.uuid=Z9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=RJ.DEFAULT_UP.clone();let J=new S,Q=new K9,$=new V9,W=new S(1,1,1);function Z(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(Z),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new JJ},normalMatrix:{value:new g0}}),this.matrix=new JJ,this.matrixWorld=new JJ,this.matrixAutoUpdate=RJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=RJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new U7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return Z8.setFromAxisAngle(J,Q),this.quaternion.multiply(Z8),this}rotateOnWorldAxis(J,Q){return Z8.setFromAxisAngle(J,Q),this.quaternion.premultiply(Z8),this}rotateX(J){return this.rotateOnAxis(wW,J)}rotateY(J){return this.rotateOnAxis(_W,J)}rotateZ(J){return this.rotateOnAxis(PW,J)}translateOnAxis(J,Q){return CW.copy(J).applyQuaternion(this.quaternion),this.position.add(CW.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(wW,J)}translateY(J){return this.translateOnAxis(_W,J)}translateZ(J){return this.translateOnAxis(PW,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(q9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)I7.copy(J);else I7.set(J,Q,$);let W=this.parent;if(this.updateWorldMatrix(!0,!1),h8.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)q9.lookAt(h8,I7,this.up);else q9.lookAt(I7,h8,this.up);if(this.quaternion.setFromRotationMatrix(q9),W)q9.extractRotation(W.matrixWorld),Z8.setFromRotationMatrix(q9),this.quaternion.premultiply(Z8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return x0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(TW),K8.child=J,this.dispatchEvent(K8),K8.child=null;else x0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(mH),d6.child=J,this.dispatchEvent(d6),d6.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),q9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),q9.multiply(J.parent.matrixWorld);return J.applyMatrix4(q9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(TW),K8.child=J,this.dispatchEvent(K8),K8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,W=this.children.length;$<W;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let W=this.children;for(let Z=0,K=W.length;Z<K;Z++)W[Z].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(h8,J,gH),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(h8,pH,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:W}=J,Z=this.matrix.elements;Z[12]+=Q-Z[0]*Q-Z[4]*$-Z[8]*W,Z[13]+=$-Z[1]*Q-Z[5]*$-Z[9]*W,Z[14]+=W-Z[2]*Q-Z[6]*$-Z[10]*W}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let W=this.parent;if(J===!0&&W!==null)W.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let Z=this.children;for(let K=0,H=Z.length;K<H;K++)Z[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,W.name=this.name,W.castShadow=this.castShadow,W.receiveShadow=this.receiveShadow,W.visible=this.visible,W.frustumCulled=this.frustumCulled,W.renderOrder=this.renderOrder,W.static=this.static,W.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.pivot!==null)W.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)W.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)W.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),W.instanceInfo=this._instanceInfo.map((H)=>({...H})),W.availableInstanceIds=this._availableInstanceIds.slice(),W.availableGeometryIds=this._availableGeometryIds.slice(),W.nextIndexStart=this._nextIndexStart,W.nextVertexStart=this._nextVertexStart,W.geometryCount=this._geometryCount,W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.matricesTexture=this._matricesTexture.toJSON(J),W.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)W.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)W.boundingBox=this.boundingBox.toJSON()}function Z(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=Z(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let N=Y[X];Z(J.shapes,N)}else Z(J.shapes,Y)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Z(J.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(Z(J.materials,this.material[Y]));W.material=H}else W.material=Z(J.materials,this.material);if(this.children.length>0){W.children=[];for(let H=0;H<this.children.length;H++)W.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){W.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];W.animations.push(Z(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),N=K(J.shapes),E=K(J.skeletons),G=K(J.animations),D=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(N.length>0)$.shapes=N;if(E.length>0)$.skeletons=E;if(G.length>0)$.animations=G;if(D.length>0)$.nodes=D}return $.object=W,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let W=J.children[$];this.add(W.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}RJ.DEFAULT_UP=new S(0,1,0);RJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;RJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class L8 extends RJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var dH={type:"move"};class G7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new L8,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new L8,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new L8,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let W=null,Z=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let R of J.hand.values()){let B=Q.getJointPose(R,$),F=this._getHandJoint(X,R);if(B!==null)F.matrix.fromArray(B.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=B.radius;F.visible=B!==null}let U=X.joints["index-finger-tip"],N=X.joints["thumb-tip"],E=U.position.distanceTo(N.position),G=0.02,D=0.005;if(X.inputState.pinching&&E>G+D)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&E<=G-D)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(Z=Q.getPose(J.gripSpace,$),Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(W=Q.getPose(J.targetRaySpace,$),W===null&&Z!==null)W=Z;if(W!==null){if(H.matrix.fromArray(W.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,W.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(W.linearVelocity);else H.hasLinearVelocity=!1;if(W.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(W.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(dH)}}}if(H!==null)H.visible=W!==null;if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new L8;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var KK={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},w9={h:0,s:0,l:0},z7={h:0,s:0,l:0};function l6(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class m0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let W=J;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,r0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,W=r0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,r0.colorSpaceToWorking(this,W),this}setHSL(J,Q,$,W=r0.workingColorSpace){if(J=E$(J,1),Q=s0(Q,0,1),$=s0($,0,1),Q===0)this.r=this.g=this.b=$;else{let Z=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-Z;this.r=l6(K,Z,J+0.3333333333333333),this.g=l6(K,Z,J),this.b=l6(K,Z,J-0.3333333333333333)}return r0.colorSpaceToWorking(this,W),this}setStyle(J,Q="srgb"){function $(Z){if(Z===void 0)return;if(parseFloat(Z)<1)f0("Color: Alpha component of "+J+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec(J)){let Z,K=W[1],H=W[2];switch(K){case"rgb":case"rgba":if(Z=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(255,parseInt(Z[1],10))/255,Math.min(255,parseInt(Z[2],10))/255,Math.min(255,parseInt(Z[3],10))/255,Q);if(Z=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(100,parseInt(Z[1],10))/100,Math.min(100,parseInt(Z[2],10))/100,Math.min(100,parseInt(Z[3],10))/100,Q);break;case"hsl":case"hsla":if(Z=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setHSL(parseFloat(Z[1])/360,parseFloat(Z[2])/100,parseFloat(Z[3])/100,Q);break;default:f0("Color: Unknown color model "+J)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec(J)){let Z=W[1],K=Z.length;if(K===3)return this.setRGB(parseInt(Z.charAt(0),16)/15,parseInt(Z.charAt(1),16)/15,parseInt(Z.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(Z,16),Q);else f0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=KK[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else f0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=M9(J.r),this.g=M9(J.g),this.b=M9(J.b),this}copyLinearToSRGB(J){return this.r=V8(J.r),this.g=V8(J.g),this.b=V8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return r0.workingToColorSpace(PJ.copy(this),J),Math.round(s0(PJ.r*255,0,255))*65536+Math.round(s0(PJ.g*255,0,255))*256+Math.round(s0(PJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=r0.workingColorSpace){r0.workingToColorSpace(PJ.copy(this),Q);let{r:$,g:W,b:Z}=PJ,K=Math.max($,W,Z),H=Math.min($,W,Z),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let N=K-H;switch(X=U<=0.5?N/(K+H):N/(2-K-H),K){case $:Y=(W-Z)/N+(W<Z?6:0);break;case W:Y=(Z-$)/N+2;break;case Z:Y=($-W)/N+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=r0.workingColorSpace){return r0.workingToColorSpace(PJ.copy(this),Q),J.r=PJ.r,J.g=PJ.g,J.b=PJ.b,J}getStyle(J="srgb"){r0.workingToColorSpace(PJ.copy(this),J);let{r:Q,g:$,b:W}=PJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(W*255)})`}offsetHSL(J,Q,$){return this.getHSL(w9),this.setHSL(w9.h+J,w9.s+Q,w9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(w9),J.getHSL(z7);let $=i8(w9.h,z7.h,Q),W=i8(w9.s,z7.s,Q),Z=i8(w9.l,z7.l,Q);return this.setHSL($,W,Z),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,W=this.b,Z=J.elements;return this.r=Z[0]*Q+Z[3]*$+Z[6]*W,this.g=Z[1]*Q+Z[4]*$+Z[7]*W,this.b=Z[2]*Q+Z[5]*$+Z[8]*W,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var PJ=new m0;m0.NAMES=KK;class q6 extends RJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new K9,this.environmentIntensity=1,this.environmentRotation=new K9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var sJ=new S,F9=new S,u6=new S,D9=new S,H8=new S,Y8=new S,SW=new S,c6=new S,n6=new S,s6=new S,i6=new DJ,o6=new DJ,a6=new DJ;class xJ{constructor(J=new S,Q=new S,$=new S){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,W){W.subVectors($,Q),sJ.subVectors(J,Q),W.cross(sJ);let Z=W.lengthSq();if(Z>0)return W.multiplyScalar(1/Math.sqrt(Z));return W.set(0,0,0)}static getBarycoord(J,Q,$,W,Z){sJ.subVectors(W,Q),F9.subVectors($,Q),u6.subVectors(J,Q);let K=sJ.dot(sJ),H=sJ.dot(F9),Y=sJ.dot(u6),X=F9.dot(F9),U=F9.dot(u6),N=K*X-H*H;if(N===0)return Z.set(0,0,0),null;let E=1/N,G=(X*Y-H*U)*E,D=(K*U-H*Y)*E;return Z.set(1-G-D,D,G)}static containsPoint(J,Q,$,W){if(this.getBarycoord(J,Q,$,W,D9)===null)return!1;return D9.x>=0&&D9.y>=0&&D9.x+D9.y<=1}static getInterpolation(J,Q,$,W,Z,K,H,Y){if(this.getBarycoord(J,Q,$,W,D9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(Z,D9.x),Y.addScaledVector(K,D9.y),Y.addScaledVector(H,D9.z),Y}static getInterpolatedAttribute(J,Q,$,W,Z,K){return i6.setScalar(0),o6.setScalar(0),a6.setScalar(0),i6.fromBufferAttribute(J,Q),o6.fromBufferAttribute(J,$),a6.fromBufferAttribute(J,W),K.setScalar(0),K.addScaledVector(i6,Z.x),K.addScaledVector(o6,Z.y),K.addScaledVector(a6,Z.z),K}static isFrontFacing(J,Q,$,W){return sJ.subVectors($,Q),F9.subVectors(J,Q),sJ.cross(F9).dot(W)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,W){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[W]),this}setFromAttributeAndIndices(J,Q,$,W){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,W),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return sJ.subVectors(this.c,this.b),F9.subVectors(this.a,this.b),sJ.cross(F9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return xJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return xJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,W,Z){return xJ.getInterpolation(J,this.a,this.b,this.c,Q,$,W,Z)}containsPoint(J){return xJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return xJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,W=this.b,Z=this.c,K,H;H8.subVectors(W,$),Y8.subVectors(Z,$),c6.subVectors(J,$);let Y=H8.dot(c6),X=Y8.dot(c6);if(Y<=0&&X<=0)return Q.copy($);n6.subVectors(J,W);let U=H8.dot(n6),N=Y8.dot(n6);if(U>=0&&N<=U)return Q.copy(W);let E=Y*N-U*X;if(E<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector(H8,K);s6.subVectors(J,Z);let G=H8.dot(s6),D=Y8.dot(s6);if(D>=0&&G<=D)return Q.copy(Z);let R=G*X-Y*D;if(R<=0&&X>=0&&D<=0)return H=X/(X-D),Q.copy($).addScaledVector(Y8,H);let B=U*D-G*N;if(B<=0&&N-U>=0&&G-D>=0)return SW.subVectors(Z,W),H=(N-U)/(N-U+(G-D)),Q.copy(W).addScaledVector(SW,H);let F=1/(B+R+E);return K=R*F,H=E*F,Q.copy($).addScaledVector(H8,K).addScaledVector(Y8,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class B9{constructor(J=new S(1/0,1/0,1/0),Q=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(iJ.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(iJ.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=iJ.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let Z=$.getAttribute("position");if(Q===!0&&Z!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=Z.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,iJ);else iJ.fromBufferAttribute(Z,K);iJ.applyMatrix4(J.matrixWorld),this.expandByPoint(iJ)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();A7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();A7.copy($.boundingBox)}A7.applyMatrix4(J.matrixWorld),this.union(A7)}}let W=J.children;for(let Z=0,K=W.length;Z<K;Z++)this.expandByObject(W[Z],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,iJ),iJ.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(b8),C7.subVectors(this.max,b8),X8.subVectors(J.a,b8),U8.subVectors(J.b,b8),G8.subVectors(J.c,b8),_9.subVectors(U8,X8),P9.subVectors(G8,U8),h9.subVectors(X8,G8);let Q=[0,-_9.z,_9.y,0,-P9.z,P9.y,0,-h9.z,h9.y,_9.z,0,-_9.x,P9.z,0,-P9.x,h9.z,0,-h9.x,-_9.y,_9.x,0,-P9.y,P9.x,0,-h9.y,h9.x,0];if(!r6(Q,X8,U8,G8,C7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!r6(Q,X8,U8,G8,C7))return!1;return w7.crossVectors(_9,P9),Q=[w7.x,w7.y,w7.z],r6(Q,X8,U8,G8,C7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,iJ).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(iJ).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return O9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),O9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),O9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),O9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),O9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),O9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),O9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),O9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(O9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var O9=[new S,new S,new S,new S,new S,new S,new S,new S],iJ=new S,A7=new B9,X8=new S,U8=new S,G8=new S,_9=new S,P9=new S,h9=new S,b8=new S,C7=new S,w7=new S,b9=new S;function r6(J,Q,$,W,Z){for(let K=0,H=J.length-3;K<=H;K+=3){b9.fromArray(J,K);let Y=Z.x*Math.abs(b9.x)+Z.y*Math.abs(b9.y)+Z.z*Math.abs(b9.z),X=Q.dot(b9),U=$.dot(b9),N=W.dot(b9);if(Math.max(-Math.max(X,U,N),Math.min(X,U,N))>Y)return!1}return!0}var VJ=new S,_7=new Y0,lH=0;class gJ extends L9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lH++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let W=0,Z=this.itemSize;W<Z;W++)this.array[J+W]=Q.array[$+W];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)_7.fromBufferAttribute(this,Q),_7.applyMatrix3(J),this.setXY(Q,_7.x,_7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)VJ.fromBufferAttribute(this,Q),VJ.applyMatrix3(J),this.setXYZ(Q,VJ.x,VJ.y,VJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)VJ.fromBufferAttribute(this,Q),VJ.applyMatrix4(J),this.setXYZ(Q,VJ.x,VJ.y,VJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)VJ.fromBufferAttribute(this,Q),VJ.applyNormalMatrix(J),this.setXYZ(Q,VJ.x,VJ.y,VJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)VJ.fromBufferAttribute(this,Q),VJ.transformDirection(J),this.setXYZ(Q,VJ.x,VJ.y,VJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=oJ($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=HJ($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=oJ(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=oJ(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=oJ(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=oJ(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,W){if(J*=this.itemSize,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),W=HJ(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this}setXYZW(J,Q,$,W,Z){if(J*=this.itemSize,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),W=HJ(W,this.array),Z=HJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this.array[J+3]=Z,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class F6 extends gJ{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class D6 extends gJ{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class WJ extends gJ{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var uH=new B9,x8=new S,t6=new S;class y9{constructor(J=new S,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else uH.setFromPoints(J).getCenter($);let W=0;for(let Z=0,K=J.length;Z<K;Z++)W=Math.max(W,$.distanceToSquared(J[Z]));return this.radius=Math.sqrt(W),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;x8.subVectors(J,this.center);let Q=x8.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),W=($-this.radius)*0.5;this.center.addScaledVector(x8,W/$),this.radius+=W}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else t6.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(x8.copy(J.center).add(t6)),this.expandByPoint(x8.copy(J.center).sub(t6));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var cH=0,dJ=new JJ,e6=new RJ,N8=new S,bJ=new B9,g8=new B9,zJ=new S;class AJ extends L9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cH++}),this.uuid=Z9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((FH(J))?D6:F6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let Z=new g0().getNormalMatrix(J);$.applyNormalMatrix(Z),$.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection(J),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return dJ.makeRotationFromQuaternion(J),this.applyMatrix4(dJ),this}rotateX(J){return dJ.makeRotationX(J),this.applyMatrix4(dJ),this}rotateY(J){return dJ.makeRotationY(J),this.applyMatrix4(dJ),this}rotateZ(J){return dJ.makeRotationZ(J),this.applyMatrix4(dJ),this}translate(J,Q,$){return dJ.makeTranslation(J,Q,$),this.applyMatrix4(dJ),this}scale(J,Q,$){return dJ.makeScale(J,Q,$),this.applyMatrix4(dJ),this}lookAt(J){return e6.lookAt(J),e6.updateMatrix(),this.applyMatrix4(e6.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(N8).negate(),this.translate(N8.x,N8.y,N8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let W=0,Z=J.length;W<Z;W++){let K=J[W];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new WJ($,3))}else{let $=Math.min(J.length,Q.count);for(let W=0;W<$;W++){let Z=J[W];Q.setXYZ(W,Z.x,Z.y,Z.z||0)}if(J.length>Q.count)f0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new B9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){x0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,W=Q.length;$<W;$++){let Z=Q[$];if(bJ.setFromBufferAttribute(Z),this.morphTargetsRelative)zJ.addVectors(this.boundingBox.min,bJ.min),this.boundingBox.expandByPoint(zJ),zJ.addVectors(this.boundingBox.max,bJ.max),this.boundingBox.expandByPoint(zJ);else this.boundingBox.expandByPoint(bJ.min),this.boundingBox.expandByPoint(bJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))x0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new y9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){x0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(J){let $=this.boundingSphere.center;if(bJ.setFromBufferAttribute(J),Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z];if(g8.setFromBufferAttribute(H),this.morphTargetsRelative)zJ.addVectors(bJ.min,g8.min),bJ.expandByPoint(zJ),zJ.addVectors(bJ.max,g8.max),bJ.expandByPoint(zJ);else bJ.expandByPoint(g8.min),bJ.expandByPoint(g8.max)}bJ.getCenter($);let W=0;for(let Z=0,K=J.count;Z<K;Z++)zJ.fromBufferAttribute(J,Z),W=Math.max(W,$.distanceToSquared(zJ));if(Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(zJ.fromBufferAttribute(H,X),Y)N8.fromBufferAttribute(J,X),zJ.add(N8);W=Math.max(W,$.distanceToSquared(zJ))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))x0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){x0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:W,uv:Z}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new gJ(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let _=0;_<$.count;_++)H[_]=new S,Y[_]=new S;let X=new S,U=new S,N=new S,E=new Y0,G=new Y0,D=new Y0,R=new S,B=new S;function F(_,M,I){X.fromBufferAttribute($,_),U.fromBufferAttribute($,M),N.fromBufferAttribute($,I),E.fromBufferAttribute(Z,_),G.fromBufferAttribute(Z,M),D.fromBufferAttribute(Z,I),U.sub(X),N.sub(X),G.sub(E),D.sub(E);let g=1/(G.x*D.y-D.x*G.y);if(!isFinite(g))return;R.copy(U).multiplyScalar(D.y).addScaledVector(N,-G.y).multiplyScalar(g),B.copy(N).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(g),H[_].add(R),H[M].add(R),H[I].add(R),Y[_].add(B),Y[M].add(B),Y[I].add(B)}let q=this.groups;if(q.length===0)q=[{start:0,count:J.count}];for(let _=0,M=q.length;_<M;++_){let I=q[_],g=I.start,v=I.count;for(let h=g,i=g+v;h<i;h+=3)F(J.getX(h+0),J.getX(h+1),J.getX(h+2))}let A=new S,C=new S,L=new S,z=new S;function w(_){L.fromBufferAttribute(W,_),z.copy(L);let M=H[_];A.copy(M),A.sub(L.multiplyScalar(L.dot(M))).normalize(),C.crossVectors(z,M);let g=C.dot(Y[_])<0?-1:1;K.setXYZW(_,A.x,A.y,A.z,g)}for(let _=0,M=q.length;_<M;++_){let I=q[_],g=I.start,v=I.count;for(let h=g,i=g+v;h<i;h+=3)w(J.getX(h+0)),w(J.getX(h+1)),w(J.getX(h+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new gJ(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let E=0,G=$.count;E<G;E++)$.setXYZ(E,0,0,0);let W=new S,Z=new S,K=new S,H=new S,Y=new S,X=new S,U=new S,N=new S;if(J)for(let E=0,G=J.count;E<G;E+=3){let D=J.getX(E+0),R=J.getX(E+1),B=J.getX(E+2);W.fromBufferAttribute(Q,D),Z.fromBufferAttribute(Q,R),K.fromBufferAttribute(Q,B),U.subVectors(K,Z),N.subVectors(W,Z),U.cross(N),H.fromBufferAttribute($,D),Y.fromBufferAttribute($,R),X.fromBufferAttribute($,B),H.add(U),Y.add(U),X.add(U),$.setXYZ(D,H.x,H.y,H.z),$.setXYZ(R,Y.x,Y.y,Y.z),$.setXYZ(B,X.x,X.y,X.z)}else for(let E=0,G=Q.count;E<G;E+=3)W.fromBufferAttribute(Q,E+0),Z.fromBufferAttribute(Q,E+1),K.fromBufferAttribute(Q,E+2),U.subVectors(K,Z),N.subVectors(W,Z),U.cross(N),$.setXYZ(E+0,U.x,U.y,U.z),$.setXYZ(E+1,U.x,U.y,U.z),$.setXYZ(E+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)zJ.fromBufferAttribute(J,Q),zJ.normalize(),J.setXYZ(Q,zJ.x,zJ.y,zJ.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:N}=H,E=new X.constructor(Y.length*U),G=0,D=0;for(let R=0,B=Y.length;R<B;R++){if(H.isInterleavedBufferAttribute)G=Y[R]*H.data.stride+H.offset;else G=Y[R]*U;for(let F=0;F<U;F++)E[D++]=X[G++]}return new gJ(E,U,N)}if(this.index===null)return f0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new AJ,$=this.index.array,W=this.attributes;for(let H in W){let Y=W[H],X=J(Y,$);Q.setAttribute(H,X)}let Z=this.morphAttributes;for(let H in Z){let Y=[],X=Z[H];for(let U=0,N=X.length;U<N;U++){let E=X[U],G=J(E,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let W={},Z=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let N=0,E=X.length;N<E;N++){let G=X[N];U.push(G.toJSON(J.data))}if(U.length>0)W[Y]=U,Z=!0}if(Z)J.data.morphAttributes=W,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let W=J.attributes;for(let X in W){let U=W[X];this.setAttribute(X,U.clone(Q))}let Z=J.morphAttributes;for(let X in Z){let U=[],N=Z[X];for(let E=0,G=N.length;E<G;E++)U.push(N[E].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let N=K[X];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class O${constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=Z9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let W=0,Z=this.stride;W<Z;W++)this.array[J+W]=Q.array[$+W];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=Z9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=Z9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let Q={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return Q.usage=this.usage,Q}}var yJ=new S;class e8{constructor(J,Q,$,W=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=W}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)yJ.fromBufferAttribute(this,Q),yJ.applyMatrix4(J),this.setXYZ(Q,yJ.x,yJ.y,yJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)yJ.fromBufferAttribute(this,Q),yJ.applyNormalMatrix(J),this.setXYZ(Q,yJ.x,yJ.y,yJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)yJ.fromBufferAttribute(this,Q),yJ.transformDirection(J),this.setXYZ(Q,yJ.x,yJ.y,yJ.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=oJ($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=HJ($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=HJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=oJ(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=oJ(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=oJ(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=oJ(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,W){if(J=J*this.data.stride+this.offset,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),W=HJ(W,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=W,this}setXYZW(J,Q,$,W,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=HJ(Q,this.array),$=HJ($,this.array),W=HJ(W,this.array),Z=HJ(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=W,this.data.array[J+3]=Z,this}clone(J){if(J===void 0){t8("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let W=$*this.data.stride+this.offset;for(let Z=0;Z<this.itemSize;Z++)Q.push(this.data.array[W+Z])}return new gJ(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new e8(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){t8("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let W=$*this.data.stride+this.offset;for(let Z=0;Z<this.itemSize;Z++)Q.push(this.data.array[W+Z])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var JQ=new S,nH=new S,sH=new g0;class $9{constructor(J=new S(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,W){return this.normal.set(J,Q,$),this.constant=W,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let W=JQ.subVectors($,Q).cross(nH.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(W,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let W=J.delta(JQ),Z=this.normal.dot(W);if(Z===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(W,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||sH.getNormalMatrix(J),W=this.coplanarPoint(JQ).applyMatrix4(J),Z=this.normal.applyMatrix3($).normalize();return this.constant=-W.dot(Z),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var iH=0;class tJ extends L9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:iH++}),this.uuid=Z9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new m0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){f0(`Material: parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){f0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set($);else if(W&&W.isVector2&&($&&$.isVector2)||W&&W.isEuler&&($&&$.isEuler)||W&&W.isVector3&&($&&$.isVector3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,$.blending=this.blending,$.side=this.side,$.shadowSide=this.shadowSide,$.vertexColors=this.vertexColors,$.opacity=this.opacity,$.transparent=this.transparent,$.blendSrc=this.blendSrc,$.blendDst=this.blendDst,$.blendEquation=this.blendEquation,$.blendSrcAlpha=this.blendSrcAlpha,$.blendDstAlpha=this.blendDstAlpha,$.blendEquationAlpha=this.blendEquationAlpha,$.blendColor=this.blendColor.getHex(),$.blendAlpha=this.blendAlpha,$.depthFunc=this.depthFunc,$.depthTest=this.depthTest,$.depthWrite=this.depthWrite,$.colorWrite=this.colorWrite,$.clipIntersection=this.clipIntersection,$.clipShadows=this.clipShadows,$.stencilWriteMask=this.stencilWriteMask,$.stencilFunc=this.stencilFunc,$.stencilRef=this.stencilRef,$.stencilFuncMask=this.stencilFuncMask,$.stencilFail=this.stencilFail,$.stencilZFail=this.stencilZFail,$.stencilZPass=this.stencilZPass,$.stencilWrite=this.stencilWrite,$.polygonOffset=this.polygonOffset,$.polygonOffsetFactor=this.polygonOffsetFactor,$.polygonOffsetUnits=this.polygonOffsetUnits,$.dithering=this.dithering,$.alphaTest=this.alphaTest,$.alphaHash=this.alphaHash,$.alphaToCoverage=this.alphaToCoverage,$.premultipliedAlpha=this.premultipliedAlpha,$.forceSinglePass=this.forceSinglePass,$.allowOverride=this.allowOverride,$.visible=this.visible,$.toneMapped=this.toneMapped,$.name=this.name,this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)$.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)$.clippingPlanes=this.clippingPlanes.map((Z)=>Z.toJSON());if(this.rotation!==void 0)$.rotation=this.rotation;if(this.depthPacking!==void 0)$.depthPacking=this.depthPacking;if(this.linewidth!==void 0)$.linewidth=this.linewidth;if(this.linecap!==void 0)$.linecap=this.linecap;if(this.linejoin!==void 0)$.linejoin=this.linejoin;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.wireframe!==void 0)$.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)$.flatShading=this.flatShading;if(this.fog!==void 0)$.fog=this.fog;if(Object.keys(this.userData).length>0)$.userData=this.userData;function W(Z){let K=[];for(let H in Z){let Y=Z[H];delete Y.metadata,K.push(Y)}return K}if(Q){let Z=W(J.textures),K=W(J.images);if(Z.length>0)$.textures=Z;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new m0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map(($)=>new $9().fromJSON($));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new Y0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new Y0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let W=Q.length;$=Array(W);for(let Z=0;Z!==W;++Z)$[Z]=Q[Z].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class R$ extends tJ{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new m0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var E8,p8=new S,q8=new S,F8=new S,D8=new Y0,m8=new Y0,HK=new JJ,P7=new S,d8=new S,T7=new S,jW=new Y0,QQ=new Y0,yW=new Y0;class YK extends RJ{constructor(J=new R$){super();if(this.isSprite=!0,this.type="Sprite",E8===void 0){E8=new AJ;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new O$(Q,5);E8.setIndex([0,1,2,0,2,3]),E8.setAttribute("position",new e8($,3,0,!1)),E8.setAttribute("uv",new e8($,2,3,!1))}this.geometry=E8,this.material=J,this.center=new Y0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,Q){if(J.camera===null)x0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(q8.setFromMatrixScale(this.matrixWorld),HK.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),F8.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)q8.multiplyScalar(-F8.z);let $=this.material.rotation,W,Z;if($!==0)Z=Math.cos($),W=Math.sin($);let K=this.center;S7(P7.set(-0.5,-0.5,0),F8,K,q8,W,Z),S7(d8.set(0.5,-0.5,0),F8,K,q8,W,Z),S7(T7.set(0.5,0.5,0),F8,K,q8,W,Z),jW.set(0,0),QQ.set(1,0),yW.set(1,1);let H=J.ray.intersectTriangle(P7,d8,T7,!1,p8);if(H===null){if(S7(d8.set(-0.5,0.5,0),F8,K,q8,W,Z),QQ.set(0,1),H=J.ray.intersectTriangle(P7,T7,d8,!1,p8),H===null)return}let Y=J.ray.origin.distanceTo(p8);if(Y<J.near||Y>J.far)return;Q.push({distance:Y,point:p8.clone(),uv:xJ.getInterpolation(p8,P7,d8,T7,jW,QQ,yW,new Y0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function S7(J,Q,$,W,Z,K){if(D8.subVectors(J,$).addScalar(0.5).multiply(W),Z!==void 0)m8.x=K*D8.x-Z*D8.y,m8.y=Z*D8.x+K*D8.y;else m8.copy(D8);J.copy(Q),J.x+=m8.x,J.y+=m8.y,J.applyMatrix4(HK)}var R9=new S,$Q=new S,j7=new S,y7=new S;class N7{constructor(J=new S,Q=new S(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,R9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=R9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return R9.copy(this.origin).addScaledVector(this.direction,Q),R9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,W){$Q.copy(J).add(Q).multiplyScalar(0.5),j7.copy(Q).sub(J).normalize(),y7.copy(this.origin).sub($Q);let Z=J.distanceTo(Q)*0.5,K=-this.direction.dot(j7),H=y7.dot(this.direction),Y=-y7.dot(j7),X=y7.lengthSq(),U=Math.abs(1-K*K),N,E,G,D;if(U>0)if(N=K*Y-H,E=K*H-Y,D=Z*U,N>=0)if(E>=-D)if(E<=D){let R=1/U;N*=R,E*=R,G=N*(N+K*E+2*H)+E*(K*N+E+2*Y)+X}else E=Z,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else E=-Z,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else if(E<=-D)N=Math.max(0,-(-K*Z+H)),E=N>0?-Z:Math.min(Math.max(-Z,-Y),Z),G=-N*N+E*(E+2*Y)+X;else if(E<=D)N=0,E=Math.min(Math.max(-Z,-Y),Z),G=E*(E+2*Y)+X;else N=Math.max(0,-(K*Z+H)),E=N>0?Z:Math.min(Math.max(-Z,-Y),Z),G=-N*N+E*(E+2*Y)+X;else E=K>0?-Z:Z,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(W)W.copy($Q).addScaledVector(j7,E);return G}intersectSphere(J,Q){if(J.radius<0)return null;R9.subVectors(J.center,this.origin);let $=R9.dot(this.direction),W=R9.dot(R9)-$*$,Z=J.radius*J.radius;if(W>Z)return null;let K=Math.sqrt(Z-W),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,W,Z,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,N=1/this.direction.z,E=this.origin;if(X>=0)$=(J.min.x-E.x)*X,W=(J.max.x-E.x)*X;else $=(J.max.x-E.x)*X,W=(J.min.x-E.x)*X;if(U>=0)Z=(J.min.y-E.y)*U,K=(J.max.y-E.y)*U;else Z=(J.max.y-E.y)*U,K=(J.min.y-E.y)*U;if($>K||Z>W)return null;if(Z>$||isNaN($))$=Z;if(K<W||isNaN(W))W=K;if(N>=0)H=(J.min.z-E.z)*N,Y=(J.max.z-E.z)*N;else H=(J.max.z-E.z)*N,Y=(J.min.z-E.z)*N;if($>Y||H>W)return null;if(H>$||$!==$)$=H;if(Y<W||W!==W)W=Y;if(W<0)return null;return this.at($>=0?$:W,Q)}intersectsBox(J){return this.intersectBox(J,R9)!==null}intersectTriangle(J,Q,$,W,Z){let K=this.origin,H=this.direction,Y=H.x,X=H.y,U=H.z,N=J.x-K.x,E=J.y-K.y,G=J.z-K.z,D=Q.x-K.x,R=Q.y-K.y,B=Q.z-K.z,F=$.x-K.x,q=$.y-K.y,A=$.z-K.z,C=Math.abs(Y),L=Math.abs(X),z=Math.abs(U),w,_,M,I,g,v,h,i,T,p,o,m;if(C>=L&&C>=z)if(M=Y,v=N,T=D,m=F,Y>=0)w=X,_=U,I=E,g=G,h=R,i=B,p=q,o=A;else w=U,_=X,I=G,g=E,h=B,i=R,p=A,o=q;else if(L>=z)if(M=X,v=E,T=R,m=q,X>=0)w=U,_=Y,I=G,g=N,h=B,i=D,p=A,o=F;else w=Y,_=U,I=N,g=G,h=D,i=B,p=F,o=A;else if(M=U,v=G,T=B,m=A,U>=0)w=Y,_=X,I=N,g=E,h=D,i=R,p=F,o=q;else w=X,_=Y,I=E,g=N,h=R,i=D,p=q,o=F;if(M===0)return null;let Z0=w/M,u=_/M,r=1/M,Q0=I-Z0*v,T0=g-u*v,S0=h-Z0*T,ZJ=i-u*T,u0=p-Z0*m,n=o-u*m,H0=u0*ZJ-n*S0,W0=Q0*n-T0*u0,j0=S0*T0-ZJ*Q0;if(W){if(H0<0||W0<0||j0<0)return null}else if((H0<0||W0<0||j0<0)&&(H0>0||W0>0||j0>0))return null;let h0=H0+W0+j0;if(h0===0)return null;let z0=r*(H0*v+W0*T+j0*m);if(h0>0?z0<0:z0>0)return null;return this.at(z0/h0,Z)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class O6 extends tJ{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new m0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new K9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var vW=new JJ,x9=new N7,v7=new y9,fW=new S,f7=new S,h7=new S,b7=new S,WQ=new S,x7=new S,hW=new S,g7=new S;class kJ extends RJ{constructor(J=new AJ,Q=new O6){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}getVertexPosition(J,Q){let $=this.geometry,W=$.attributes.position,Z=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(W,J);let H=this.morphTargetInfluences;if(Z&&H){x7.set(0,0,0);for(let Y=0,X=Z.length;Y<X;Y++){let U=H[Y],N=Z[Y];if(U===0)continue;if(WQ.fromBufferAttribute(N,J),K)x7.addScaledVector(WQ,U);else x7.addScaledVector(WQ.sub(Q),U)}Q.add(x7)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,W=this.material,Z=this.matrixWorld;if(W===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(v7.copy($.boundingSphere),v7.applyMatrix4(Z),x9.copy(J.ray).recast(J.near),v7.containsPoint(x9.origin)===!1){if(x9.intersectSphere(v7,fW)===null)return;if(x9.origin.distanceToSquared(fW)>(J.far-J.near)**2)return}if(vW.copy(Z).invert(),x9.copy(J.ray).applyMatrix4(vW),$.boundingBox!==null){if(x9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,x9)}_computeIntersections(J,Q,$){let W,Z=this.geometry,K=this.material,H=Z.index,Y=Z.attributes.position,X=Z.attributes.uv,U=Z.attributes.uv1,N=Z.attributes.normal,E=Z.groups,G=Z.drawRange;if(H!==null)if(Array.isArray(K))for(let D=0,R=E.length;D<R;D++){let B=E[D],F=K[B.materialIndex],q=Math.max(B.start,G.start),A=Math.min(H.count,Math.min(B.start+B.count,G.start+G.count));for(let C=q,L=A;C<L;C+=3){let z=H.getX(C),w=H.getX(C+1),_=H.getX(C+2);if(W=p7(this,F,J,$,X,U,N,z,w,_),W)W.faceIndex=Math.floor(C/3),W.face.materialIndex=B.materialIndex,Q.push(W)}}else{let D=Math.max(0,G.start),R=Math.min(H.count,G.start+G.count);for(let B=D,F=R;B<F;B+=3){let q=H.getX(B),A=H.getX(B+1),C=H.getX(B+2);if(W=p7(this,K,J,$,X,U,N,q,A,C),W)W.faceIndex=Math.floor(B/3),Q.push(W)}}else if(Y!==void 0)if(Array.isArray(K))for(let D=0,R=E.length;D<R;D++){let B=E[D],F=K[B.materialIndex],q=Math.max(B.start,G.start),A=Math.min(Y.count,Math.min(B.start+B.count,G.start+G.count));for(let C=q,L=A;C<L;C+=3){let z=C,w=C+1,_=C+2;if(W=p7(this,F,J,$,X,U,N,z,w,_),W)W.faceIndex=Math.floor(C/3),W.face.materialIndex=B.materialIndex,Q.push(W)}}else{let D=Math.max(0,G.start),R=Math.min(Y.count,G.start+G.count);for(let B=D,F=R;B<F;B+=3){let q=B,A=B+1,C=B+2;if(W=p7(this,K,J,$,X,U,N,q,A,C),W)W.faceIndex=Math.floor(B/3),Q.push(W)}}}}function oH(J,Q,$,W,Z,K,H,Y){let X;if(Q.side===1)X=W.intersectTriangle(H,K,Z,!0,Y);else X=W.intersectTriangle(Z,K,H,Q.side===0,Y);if(X===null)return null;g7.copy(Y),g7.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(g7);if(U<$.near||U>$.far)return null;return{distance:U,point:g7.clone(),object:J}}function p7(J,Q,$,W,Z,K,H,Y,X,U){J.getVertexPosition(Y,f7),J.getVertexPosition(X,h7),J.getVertexPosition(U,b7);let N=oH(J,Q,$,W,f7,h7,b7,hW);if(N){let E=new S;if(xJ.getBarycoord(hW,f7,h7,b7,E),Z)N.uv=xJ.getInterpolatedAttribute(Z,Y,X,U,E,new Y0);if(K)N.uv1=xJ.getInterpolatedAttribute(K,Y,X,U,E,new Y0);if(H){if(N.normal=xJ.getInterpolatedAttribute(H,Y,X,U,E,new S),N.normal.dot(W.direction)>0)N.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new S,materialIndex:0};xJ.getNormal(f7,h7,b7,G.normal),N.face=G,N.barycoord=E}return N}class R6 extends CJ{constructor(J=null,Q=1,$=1,W,Z,K,H,Y,X=1003,U=1003,N,E){super(null,K,H,Y,X,U,W,Z,N,E);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class o7 extends gJ{constructor(J,Q,$,W=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=W}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var O8=new JJ,bW=new JJ,m7=[],xW=new B9,aH=new JJ,l8=new kJ,u8=new y9;class M6 extends kJ{constructor(J,Q,$){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new o7(new Float32Array($*16),16),this.instanceColor=null,this.morphTexture=null,this.count=$,this.boundingBox=null,this.boundingSphere=null;for(let W=0;W<$;W++)this.setMatrixAt(W,aH)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new B9;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,O8),xW.copy(J.boundingBox).applyMatrix4(O8),this.boundingBox.union(xW)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new y9;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,O8),u8.copy(J.boundingSphere).applyMatrix4(O8),this.boundingSphere.union(u8)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let $=Q.morphTargetInfluences,W=this.morphTexture.source.data.data,Z=$.length+1,K=J*Z+1;for(let H=0;H<$.length;H++)$[H]=W[K+H]}raycast(J,Q){let $=this.matrixWorld,W=this.count;if(l8.geometry=this.geometry,l8.material=this.material,l8.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(u8.copy(this.boundingSphere),u8.applyMatrix4($),J.ray.intersectsSphere(u8)===!1)return;for(let Z=0;Z<W;Z++){this.getMatrixAt(Z,O8),bW.multiplyMatrices($,O8),l8.matrixWorld=bW,l8.raycast(J,m7);for(let K=0,H=m7.length;K<H;K++){let Y=m7[K];Y.instanceId=Z,Y.object=this,Q.push(Y)}m7.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new o7(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let $=Q.morphTargetInfluences,W=$.length+1;if(this.morphTexture===null)this.morphTexture=new R6(new Float32Array(W*this.count),W,this.count,1028,1015);let Z=this.morphTexture.source.data.data,K=0;for(let X=0;X<$.length;X++)K+=$[X];let H=this.geometry.morphTargetsRelative?1:1-K,Y=W*J;return Z[Y]=H,Z.set($,Y+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var g9=new y9,rH=new Y0(0.5,0.5),d7=new S;class E7{constructor(J=new $9,Q=new $9,$=new $9,W=new $9,Z=new $9,K=new $9){this.planes=[J,Q,$,W,Z,K]}set(J,Q,$,W,Z,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(W),H[4].copy(Z),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let W=this.planes,Z=J.elements,K=Z[0],H=Z[1],Y=Z[2],X=Z[3],U=Z[4],N=Z[5],E=Z[6],G=Z[7],D=Z[8],R=Z[9],B=Z[10],F=Z[11],q=Z[12],A=Z[13],C=Z[14],L=Z[15];if(W[0].setComponents(X-K,G-U,F-D,L-q).normalize(),W[1].setComponents(X+K,G+U,F+D,L+q).normalize(),W[2].setComponents(X+H,G+N,F+R,L+A).normalize(),W[3].setComponents(X-H,G-N,F-R,L-A).normalize(),$)W[4].setComponents(Y,E,B,C).normalize(),W[5].setComponents(X-Y,G-E,F-B,L-C).normalize();else if(W[4].setComponents(X-Y,G-E,F-B,L-C).normalize(),Q===2000)W[5].setComponents(X+Y,G+E,F+B,L+C).normalize();else if(Q===2001)W[5].setComponents(Y,E,B,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();g9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();g9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(g9)}intersectsSprite(J){g9.center.set(0,0,0);let Q=rH.distanceTo(J.center);return g9.radius=0.7071067811865476+Q,g9.applyMatrix4(J.matrixWorld),this.intersectsSphere(g9)}intersectsSphere(J){let Q=this.planes,$=J.center,W=-J.radius;for(let Z=0;Z<6;Z++)if(Q[Z].distanceToPoint($)<W)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let W=Q[$];if(d7.x=W.normal.x>0?J.max.x:J.min.x,d7.y=W.normal.y>0?J.max.y:J.min.y,d7.z=W.normal.z>0?J.max.z:J.min.z,W.distanceToPoint(d7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class M$ extends tJ{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new m0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var a7=new S,r7=new S,gW=new JJ,c8=new N7,l7=new y9,ZQ=new S,pW=new S;class k$ extends RJ{constructor(J=new AJ,Q=new M$){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let W=1,Z=Q.count;W<Z;W++)a7.fromBufferAttribute(Q,W-1),r7.fromBufferAttribute(Q,W),$[W]=$[W-1],$[W]+=a7.distanceTo(r7);J.setAttribute("lineDistance",new WJ($,1))}else f0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,W=this.matrixWorld,Z=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(l7.copy($.boundingSphere),l7.applyMatrix4(W),l7.radius+=Z,J.ray.intersectsSphere(l7)===!1)return;gW.copy(W).invert(),c8.copy(J.ray).applyMatrix4(gW);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,E=$.attributes.position;if(U!==null){let G=Math.max(0,K.start),D=Math.min(U.count,K.start+K.count);for(let R=G,B=D-1;R<B;R+=X){let F=U.getX(R),q=U.getX(R+1),A=u7(this,J,c8,Y,F,q,R);if(A)Q.push(A)}if(this.isLineLoop){let R=U.getX(D-1),B=U.getX(G),F=u7(this,J,c8,Y,R,B,D-1);if(F)Q.push(F)}}else{let G=Math.max(0,K.start),D=Math.min(E.count,K.start+K.count);for(let R=G,B=D-1;R<B;R+=X){let F=u7(this,J,c8,Y,R,R+1,R);if(F)Q.push(F)}if(this.isLineLoop){let R=u7(this,J,c8,Y,D-1,G,D-1);if(R)Q.push(R)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function u7(J,Q,$,W,Z,K,H){let Y=J.geometry.attributes.position;if(a7.fromBufferAttribute(Y,Z),r7.fromBufferAttribute(Y,K),$.distanceSqToSegment(a7,r7,ZQ,pW)>W)return;ZQ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(ZQ);if(U<Q.near||U>Q.far)return;return{distance:U,point:pW.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var mW=new S,dW=new S;class XK extends k${constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let W=0,Z=Q.count;W<Z;W+=2)mW.fromBufferAttribute(Q,W),dW.fromBufferAttribute(Q,W+1),$[W]=W===0?0:$[W-1],$[W+1]=$[W]+mW.distanceTo(dW);J.setAttribute("lineDistance",new WJ($,1))}else f0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class k6 extends CJ{constructor(J=[],Q=301,$,W,Z,K,H,Y,X,U){super(J,Q,$,W,Z,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class UK extends CJ{constructor(J,Q,$,W,Z,K,H,Y,X){super(J,Q,$,W,Z,K,H,Y,X);this.isCanvasTexture=!0,this.needsUpdate=!0}}class i9 extends CJ{constructor(J,Q,$=1014,W,Z,K,H=1003,Y=1003,X,U=1026,N=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let E={width:J,height:Q,depth:N};super(E,W,Z,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new X7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class L$ extends i9{constructor(J,Q=1014,$=301,W,Z,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},N=[U,U,U,U,U,U];super(J,J,Q,$,W,Z,K,H,Y,X);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class L6 extends CJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class v9 extends AJ{constructor(J=1,Q=1,$=1,W=1,Z=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:W,heightSegments:Z,depthSegments:K};let H=this;W=Math.floor(W),Z=Math.floor(Z),K=Math.floor(K);let Y=[],X=[],U=[],N=[],E=0,G=0;D("z","y","x",-1,-1,$,Q,J,K,Z,0),D("z","y","x",1,-1,$,Q,-J,K,Z,1),D("x","z","y",1,1,J,$,Q,W,K,2),D("x","z","y",1,-1,J,$,-Q,W,K,3),D("x","y","z",1,-1,J,Q,$,W,Z,4),D("x","y","z",-1,-1,J,Q,-$,W,Z,5),this.setIndex(Y),this.setAttribute("position",new WJ(X,3)),this.setAttribute("normal",new WJ(U,3)),this.setAttribute("uv",new WJ(N,2));function D(R,B,F,q,A,C,L,z,w,_,M){let I=C/w,g=L/_,v=C/2,h=L/2,i=z/2,T=w+1,p=_+1,o=0,m=0,Z0=new S;for(let u=0;u<p;u++){let r=u*g-h;for(let Q0=0;Q0<T;Q0++){let T0=Q0*I-v;Z0[R]=T0*q,Z0[B]=r*A,Z0[F]=i,X.push(Z0.x,Z0.y,Z0.z),Z0[R]=0,Z0[B]=0,Z0[F]=z>0?1:-1,U.push(Z0.x,Z0.y,Z0.z),N.push(Q0/w),N.push(1-u/_),o+=1}}for(let u=0;u<_;u++)for(let r=0;r<w;r++){let Q0=E+r+T*u,T0=E+r+T*(u+1),S0=E+(r+1)+T*(u+1),ZJ=E+(r+1)+T*u;Y.push(Q0,T0,ZJ),Y.push(T0,S0,ZJ),m+=6}H.addGroup(G,m,M),G+=m,E+=o}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new v9(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class V$ extends AJ{constructor(J=1,Q=1,$=1,W=32,Z=1,K=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:W,heightSegments:Z,openEnded:K,thetaStart:H,thetaLength:Y};let X=this;W=Math.floor(W),Z=Math.floor(Z);let U=[],N=[],E=[],G=[],D=0,R=[],B=$/2,F=0;if(q(),K===!1){if(J>0)A(!0);if(Q>0)A(!1)}this.setIndex(U),this.setAttribute("position",new WJ(N,3)),this.setAttribute("normal",new WJ(E,3)),this.setAttribute("uv",new WJ(G,2));function q(){let C=new S,L=new S,z=0,w=(Q-J)/$;for(let _=0;_<=Z;_++){let M=[],I=_/Z,g=I*(Q-J)+J;for(let v=0;v<=W;v++){let h=v/W,i=h*Y+H,T=Math.sin(i),p=Math.cos(i);L.x=g*T,L.y=-I*$+B,L.z=g*p,N.push(L.x,L.y,L.z),C.set(T,w,p).normalize(),E.push(C.x,C.y,C.z),G.push(h,1-I),M.push(D++)}R.push(M)}for(let _=0;_<W;_++)for(let M=0;M<Z;M++){let I=R[M][_],g=R[M+1][_],v=R[M+1][_+1],h=R[M][_+1];if(J>0||M!==0)U.push(I,g,h),z+=3;if(Q>0||M!==Z-1)U.push(g,v,h),z+=3}X.addGroup(F,z,0),F+=z}function A(C){let L=D,z=new Y0,w=new S,_=0,M=C===!0?J:Q,I=C===!0?1:-1;for(let v=1;v<=W;v++)N.push(0,B*I,0),E.push(0,I,0),G.push(0.5,0.5),D++;let g=D;for(let v=0;v<=W;v++){let i=v/W*Y+H,T=Math.cos(i),p=Math.sin(i);w.x=M*p,w.y=B*I,w.z=M*T,N.push(w.x,w.y,w.z),E.push(0,I,0),z.x=T*0.5+0.5,z.y=p*0.5*I+0.5,G.push(z.x,z.y),D++}for(let v=0;v<W;v++){let h=L+v,i=g+v;if(C===!0)U.push(i,i+1,h);else U.push(i+1,i,h);_+=3}X.addGroup(F,_,C===!0?1:2),F+=_}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new V$(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class lJ{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){f0("Curve: .getPoint() not implemented.")}getPointAt(J,Q){let $=this.getUtoTmapping(J);return this.getPoint($,Q)}getPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));return Q}getSpacedPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPointAt($/J));return Q}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Q=[],$,W=this.getPoint(0),Z=0;Q.push(0);for(let K=1;K<=J;K++)$=this.getPoint(K/J),Z+=$.distanceTo(W),Q.push(Z),W=$;return this.cacheArcLengths=Q,Q}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Q=null){let $=this.getLengths(),W=0,Z=$.length,K;if(Q)K=Q;else K=J*$[Z-1];let H=0,Y=Z-1,X;while(H<=Y)if(W=Math.floor(H+(Y-H)/2),X=$[W]-K,X<0)H=W+1;else if(X>0)Y=W-1;else{Y=W;break}if(W=Y,$[W]===K)return W/(Z-1);let U=$[W],E=$[W+1]-U,G=(K-U)/E;return(W+G)/(Z-1)}getTangent(J,Q){let W=J-0.0001,Z=J+0.0001;if(W<0)W=0;if(Z>1)Z=1;let K=this.getPoint(W),H=this.getPoint(Z),Y=Q||(K.isVector2?new Y0:new S);return Y.copy(H).sub(K).normalize(),Y}getTangentAt(J,Q){let $=this.getUtoTmapping(J);return this.getTangent($,Q)}computeFrenetFrames(J,Q=!1){let $=new S,W=[],Z=[],K=[],H=new S,Y=new JJ;for(let G=0;G<=J;G++){let D=G/J;W[G]=this.getTangentAt(D,new S)}Z[0]=new S,K[0]=new S;let X=Number.MAX_VALUE,U=Math.abs(W[0].x),N=Math.abs(W[0].y),E=Math.abs(W[0].z);if(U<=X)X=U,$.set(1,0,0);if(N<=X)X=N,$.set(0,1,0);if(E<=X)$.set(0,0,1);H.crossVectors(W[0],$).normalize(),Z[0].crossVectors(W[0],H),K[0].crossVectors(W[0],Z[0]);for(let G=1;G<=J;G++){if(Z[G]=Z[G-1].clone(),K[G]=K[G-1].clone(),H.crossVectors(W[G-1],W[G]),H.length()>Number.EPSILON){H.normalize();let D=Math.acos(s0(W[G-1].dot(W[G]),-1,1));Z[G].applyMatrix4(Y.makeRotationAxis(H,D))}K[G].crossVectors(W[G],Z[G])}if(Q===!0){let G=Math.acos(s0(Z[0].dot(Z[J]),-1,1));if(G/=J,W[0].dot(H.crossVectors(Z[0],Z[J]))>0)G=-G;for(let D=1;D<=J;D++)Z[D].applyMatrix4(Y.makeRotationAxis(W[D],G*D)),K[D].crossVectors(W[D],Z[D])}return{tangents:W,normals:Z,binormals:K}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class q7 extends lJ{constructor(J=0,Q=0,$=1,W=1,Z=0,K=Math.PI*2,H=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=Q,this.xRadius=$,this.yRadius=W,this.aStartAngle=Z,this.aEndAngle=K,this.aClockwise=H,this.aRotation=Y}getPoint(J,Q=new Y0){let $=Q,W=Math.PI*2,Z=this.aEndAngle-this.aStartAngle,K=Math.abs(Z)<Number.EPSILON;while(Z<0)Z+=W;while(Z>W)Z-=W;if(Z<Number.EPSILON)if(K)Z=0;else Z=W;if(this.aClockwise===!0&&!K)if(Z===W)Z=-W;else Z=Z-W;let H=this.aStartAngle+J*Z,Y=this.aX+this.xRadius*Math.cos(H),X=this.aY+this.yRadius*Math.sin(H);if(this.aRotation!==0){let U=Math.cos(this.aRotation),N=Math.sin(this.aRotation),E=Y-this.aX,G=X-this.aY;Y=E*U-G*N+this.aX,X=E*N+G*U+this.aY}return $.set(Y,X)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class B$ extends q7{constructor(J,Q,$,W,Z,K){super(J,Q,$,$,W,Z,K);this.isArcCurve=!0,this.type="ArcCurve"}}function I$(){let J=0,Q=0,$=0,W=0;function Z(K,H,Y,X){J=K,Q=Y,$=-3*K+3*H-2*Y-X,W=2*K-2*H+Y+X}return{initCatmullRom:function(K,H,Y,X,U){Z(H,Y,U*(Y-K),U*(X-H))},initNonuniformCatmullRom:function(K,H,Y,X,U,N,E){let G=(H-K)/U-(Y-K)/(U+N)+(Y-H)/N,D=(Y-H)/N-(X-H)/(N+E)+(X-Y)/E;G*=N,D*=N,Z(H,Y,G,D)},calc:function(K){let H=K*K,Y=H*K;return J+Q*K+$*H+W*Y}}}var lW=new S,uW=new S,KQ=new I$,HQ=new I$,YQ=new I$;class z$ extends lJ{constructor(J=[],Q=!1,$="centripetal",W=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=Q,this.curveType=$,this.tension=W}getPoint(J,Q=new S){let $=Q,W=this.points,Z=W.length,K=(Z-(this.closed?0:1))*J,H=Math.floor(K),Y=K-H;if(this.closed)H+=H>0?0:(Math.floor(Math.abs(H)/Z)+1)*Z;else if(Y===0&&H===Z-1)H=Z-2,Y=1;let X,U;if(this.closed||H>0)X=W[(H-1)%Z];else uW.subVectors(W[0],W[1]).add(W[0]),X=uW;let N=W[H%Z],E=W[(H+1)%Z];if(this.closed||H+2<Z)U=W[(H+2)%Z];else lW.subVectors(W[Z-1],W[Z-2]).add(W[Z-1]),U=lW;if(this.curveType==="centripetal"||this.curveType==="chordal"){let G=this.curveType==="chordal"?0.5:0.25,D=Math.pow(X.distanceToSquared(N),G),R=Math.pow(N.distanceToSquared(E),G),B=Math.pow(E.distanceToSquared(U),G);if(R<0.0001)R=1;if(D<0.0001)D=R;if(B<0.0001)B=R;KQ.initNonuniformCatmullRom(X.x,N.x,E.x,U.x,D,R,B),HQ.initNonuniformCatmullRom(X.y,N.y,E.y,U.y,D,R,B),YQ.initNonuniformCatmullRom(X.z,N.z,E.z,U.z,D,R,B)}else if(this.curveType==="catmullrom")KQ.initCatmullRom(X.x,N.x,E.x,U.x,this.tension),HQ.initCatmullRom(X.y,N.y,E.y,U.y,this.tension),YQ.initCatmullRom(X.z,N.z,E.z,U.z,this.tension);return $.set(KQ.calc(Y),HQ.calc(Y),YQ.calc(Y)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let W=J.points[Q];this.points.push(W.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let W=this.points[Q];J.points.push(W.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let W=J.points[Q];this.points.push(new S().fromArray(W))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function cW(J,Q,$,W,Z){let K=(W-Q)*0.5,H=(Z-$)*0.5,Y=J*J,X=J*Y;return(2*$-2*W+K+H)*X+(-3*$+3*W-2*K-H)*Y+K*J+$}function tH(J,Q){let $=1-J;return $*$*Q}function eH(J,Q){return 2*(1-J)*J*Q}function JY(J,Q){return J*J*Q}function o8(J,Q,$,W){return tH(J,Q)+eH(J,$)+JY(J,W)}function QY(J,Q){let $=1-J;return $*$*$*Q}function $Y(J,Q){let $=1-J;return 3*$*$*J*Q}function WY(J,Q){return 3*(1-J)*J*J*Q}function ZY(J,Q){return J*J*J*Q}function a8(J,Q,$,W,Z){return QY(J,Q)+$Y(J,$)+WY(J,W)+ZY(J,Z)}class V6 extends lJ{constructor(J=new Y0,Q=new Y0,$=new Y0,W=new Y0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=Q,this.v2=$,this.v3=W}getPoint(J,Q=new Y0){let $=Q,W=this.v0,Z=this.v1,K=this.v2,H=this.v3;return $.set(a8(J,W.x,Z.x,K.x,H.x),a8(J,W.y,Z.y,K.y,H.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class A$ extends lJ{constructor(J=new S,Q=new S,$=new S,W=new S){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=Q,this.v2=$,this.v3=W}getPoint(J,Q=new S){let $=Q,W=this.v0,Z=this.v1,K=this.v2,H=this.v3;return $.set(a8(J,W.x,Z.x,K.x,H.x),a8(J,W.y,Z.y,K.y,H.y),a8(J,W.z,Z.z,K.z,H.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class B6 extends lJ{constructor(J=new Y0,Q=new Y0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=Q}getPoint(J,Q=new Y0){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new Y0){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class C$ extends lJ{constructor(J=new S,Q=new S){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=Q}getPoint(J,Q=new S){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new S){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class I6 extends lJ{constructor(J=new Y0,Q=new Y0,$=new Y0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new Y0){let $=Q,W=this.v0,Z=this.v1,K=this.v2;return $.set(o8(J,W.x,Z.x,K.x),o8(J,W.y,Z.y,K.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class z6 extends lJ{constructor(J=new S,Q=new S,$=new S){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new S){let $=Q,W=this.v0,Z=this.v1,K=this.v2;return $.set(o8(J,W.x,Z.x,K.x),o8(J,W.y,Z.y,K.y),o8(J,W.z,Z.z,K.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class A6 extends lJ{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,Q=new Y0){let $=Q,W=this.points,Z=(W.length-1)*J,K=Math.floor(Z),H=Z-K,Y=W[K===0?K:K-1],X=W[K],U=W[K>W.length-2?W.length-1:K+1],N=W[K>W.length-3?W.length-1:K+2];return $.set(cW(H,Y.x,X.x,U.x,N.x),cW(H,Y.y,X.y,U.y,N.y)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let W=J.points[Q];this.points.push(W.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let W=this.points[Q];J.points.push(W.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let W=J.points[Q];this.points.push(new Y0().fromArray(W))}return this}}var t7=Object.freeze({__proto__:null,ArcCurve:B$,CatmullRomCurve3:z$,CubicBezierCurve:V6,CubicBezierCurve3:A$,EllipseCurve:q7,LineCurve:B6,LineCurve3:C$,QuadraticBezierCurve:I6,QuadraticBezierCurve3:z6,SplineCurve:A6});class w$ extends lJ{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),Q=this.curves[this.curves.length-1].getPoint(1);if(!J.equals(Q)){let $=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new t7[$](Q,J))}return this}getPoint(J,Q){let $=J*this.getLength(),W=this.getCurveLengths(),Z=0;while(Z<W.length){if(W[Z]>=$){let K=W[Z]-$,H=this.curves[Z],Y=H.getLength(),X=Y===0?0:1-K/Y;return H.getPointAt(X,Q)}Z++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],Q=0;for(let $=0,W=this.curves.length;$<W;$++)Q+=this.curves[$].getLength(),J.push(Q);return this.cacheLengths=J,J}getSpacedPoints(J=40){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));if(this.autoClose)Q.push(Q[0]);return Q}getPoints(J=12){let Q=[],$;for(let W=0,Z=this.curves;W<Z.length;W++){let K=Z[W],H=K.isEllipseCurve?J*2:K.isLineCurve||K.isLineCurve3?1:K.isSplineCurve?J*K.points.length:J,Y=K.getPoints(H);for(let X=0;X<Y.length;X++){let U=Y[X];if($&&$.equals(U))continue;Q.push(U),$=U}}if(this.autoClose&&Q.length>1&&!Q[Q.length-1].equals(Q[0]))Q.push(Q[0]);return Q}copy(J){super.copy(J),this.curves=[];for(let Q=0,$=J.curves.length;Q<$;Q++){let W=J.curves[Q];this.curves.push(W.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let Q=0,$=this.curves.length;Q<$;Q++){let W=this.curves[Q];J.curves.push(W.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let Q=0,$=J.curves.length;Q<$;Q++){let W=J.curves[Q];this.curves.push(new t7[W.type]().fromJSON(W))}return this}}class e7 extends w${constructor(J){super();if(this.type="Path",this.currentPoint=new Y0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let Q=1,$=J.length;Q<$;Q++)this.lineTo(J[Q].x,J[Q].y);return this}moveTo(J,Q){return this.currentPoint.set(J,Q),this}lineTo(J,Q){let $=new B6(this.currentPoint.clone(),new Y0(J,Q));return this.curves.push($),this.currentPoint.set(J,Q),this}quadraticCurveTo(J,Q,$,W){let Z=new I6(this.currentPoint.clone(),new Y0(J,Q),new Y0($,W));return this.curves.push(Z),this.currentPoint.set($,W),this}bezierCurveTo(J,Q,$,W,Z,K){let H=new V6(this.currentPoint.clone(),new Y0(J,Q),new Y0($,W),new Y0(Z,K));return this.curves.push(H),this.currentPoint.set(Z,K),this}splineThru(J){let Q=[this.currentPoint.clone()].concat(J),$=new A6(Q);return this.curves.push($),this.currentPoint.copy(J[J.length-1]),this}arc(J,Q,$,W,Z,K){let H=this.currentPoint.x,Y=this.currentPoint.y;return this.absarc(J+H,Q+Y,$,W,Z,K),this}absarc(J,Q,$,W,Z,K){return this.absellipse(J,Q,$,$,W,Z,K),this}ellipse(J,Q,$,W,Z,K,H,Y){let X=this.currentPoint.x,U=this.currentPoint.y;return this.absellipse(J+X,Q+U,$,W,Z,K,H,Y),this}absellipse(J,Q,$,W,Z,K,H,Y){let X=new q7(J,Q,$,W,Z,K,H,Y);if(this.curves.length>0){let N=X.getPoint(0);if(!N.equals(this.currentPoint))this.lineTo(N.x,N.y)}this.curves.push(X);let U=X.getPoint(1);return this.currentPoint.copy(U),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class C6 extends e7{constructor(J){super(J);this.uuid=Z9(),this.type="Shape",this.holes=[]}getPointsHoles(J){let Q=[];for(let $=0,W=this.holes.length;$<W;$++)Q[$]=this.holes[$].getPoints(J);return Q}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let Q=0,$=J.holes.length;Q<$;Q++){let W=J.holes[Q];this.holes.push(W.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let Q=0,$=this.holes.length;Q<$;Q++){let W=this.holes[Q];J.holes.push(W.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let Q=0,$=J.holes.length;Q<$;Q++){let W=J.holes[Q];this.holes.push(new e7().fromJSON(W))}return this}}function KY(J,Q,$=2){let W=Q&&Q.length,Z=W?Q[0]*$:J.length,K=GK(J,0,Z,$,!0),H=[];if(!K||K.next===K.prev)return H;let Y,X,U;if(W)K=GY(J,Q,K,$);if(J.length>80*$){Y=J[0],X=J[1];let N=Y,E=X;for(let G=$;G<Z;G+=$){let D=J[G],R=J[G+1];if(D<Y)Y=D;if(R<X)X=R;if(D>N)N=D;if(R>E)E=R}U=Math.max(N-Y,E-X),U=U!==0?32767/U:0}return J7(K,H,$,Y,X,U,0),H}function GK(J,Q,$,W,Z){let K;if(Z===VY(J,Q,$,W)>0)for(let H=Q;H<$;H+=W)K=nW(H/W|0,J[H],J[H+1],K);else for(let H=$-W;H>=Q;H-=W)K=nW(H/W|0,J[H],J[H+1],K);if(K&&z8(K,K.next))$7(K),K=K.next;return K}function m9(J,Q){if(!J)return J;if(!Q)Q=J;let $=J,W;do if(W=!1,!$.steiner&&(z8($,$.next)||OJ($.prev,$,$.next)===0)){if($7($),$=Q=$.prev,$===$.next)break;W=!0}else $=$.next;while(W||$!==Q);return Q}function J7(J,Q,$,W,Z,K,H){if(!J)return;if(!H&&K)DY(J,W,Z,K);let Y=J;while(J.prev!==J.next){let{prev:X,next:U}=J;if(K?YY(J,W,Z,K):HY(J)){Q.push(X.i,J.i,U.i),$7(J),J=U.next,Y=U.next;continue}if(J=U,J===Y){if(!H)J7(m9(J),Q,$,W,Z,K,1);else if(H===1)J=XY(m9(J),Q),J7(J,Q,$,W,Z,K,2);else if(H===2)UY(J,Q,$,W,Z,K);break}}}function HY(J){let Q=J.prev,$=J,W=J.next;if(OJ(Q,$,W)>=0)return!1;let Z=Q.x,K=$.x,H=W.x,Y=Q.y,X=$.y,U=W.y,N=Math.min(Z,K,H),E=Math.min(Y,X,U),G=Math.max(Z,K,H),D=Math.max(Y,X,U),R=W.next;while(R!==Q){if(R.x>=N&&R.x<=G&&R.y>=E&&R.y<=D&&n8(Z,Y,K,X,H,U,R.x,R.y)&&OJ(R.prev,R,R.next)>=0)return!1;R=R.next}return!0}function YY(J,Q,$,W){let Z=J.prev,K=J,H=J.next;if(OJ(Z,K,H)>=0)return!1;let Y=Z.x,X=K.x,U=H.x,N=Z.y,E=K.y,G=H.y,D=Math.min(Y,X,U),R=Math.min(N,E,G),B=Math.max(Y,X,U),F=Math.max(N,E,G),q=GQ(D,R,Q,$,W),A=GQ(B,F,Q,$,W),C=J.prevZ,L=J.nextZ;while(C&&C.z>=q&&L&&L.z<=A){if(C.x>=D&&C.x<=B&&C.y>=R&&C.y<=F&&C!==Z&&C!==H&&n8(Y,N,X,E,U,G,C.x,C.y)&&OJ(C.prev,C,C.next)>=0)return!1;if(C=C.prevZ,L.x>=D&&L.x<=B&&L.y>=R&&L.y<=F&&L!==Z&&L!==H&&n8(Y,N,X,E,U,G,L.x,L.y)&&OJ(L.prev,L,L.next)>=0)return!1;L=L.nextZ}while(C&&C.z>=q){if(C.x>=D&&C.x<=B&&C.y>=R&&C.y<=F&&C!==Z&&C!==H&&n8(Y,N,X,E,U,G,C.x,C.y)&&OJ(C.prev,C,C.next)>=0)return!1;C=C.prevZ}while(L&&L.z<=A){if(L.x>=D&&L.x<=B&&L.y>=R&&L.y<=F&&L!==Z&&L!==H&&n8(Y,N,X,E,U,G,L.x,L.y)&&OJ(L.prev,L,L.next)>=0)return!1;L=L.nextZ}return!0}function XY(J,Q){let $=J;do{let W=$.prev,Z=$.next.next;if(!z8(W,Z)&&EK(W,$,$.next,Z)&&Q7(W,Z)&&Q7(Z,W))Q.push(W.i,$.i,Z.i),$7($),$7($.next),$=J=Z;$=$.next}while($!==J);return m9($)}function UY(J,Q,$,W,Z,K){let H=J;do{let Y=H.next.next;while(Y!==H.prev){if(H.i!==Y.i&&MY(H,Y)){let X=qK(H,Y);H=m9(H,H.next),X=m9(X,X.next),J7(H,Q,$,W,Z,K,0),J7(X,Q,$,W,Z,K,0);return}Y=Y.next}H=H.next}while(H!==J)}function GY(J,Q,$,W){let Z=[];for(let K=0,H=Q.length;K<H;K++){let Y=Q[K]*W,X=K<H-1?Q[K+1]*W:J.length,U=GK(J,Y,X,W,!1);if(U===U.next)U.steiner=!0;Z.push(RY(U))}Z.sort(NY);for(let K=0;K<Z.length;K++)$=EY(Z[K],$);return $}function NY(J,Q){let $=J.x-Q.x;if($===0){if($=J.y-Q.y,$===0){let W=(J.next.y-J.y)/(J.next.x-J.x),Z=(Q.next.y-Q.y)/(Q.next.x-Q.x);$=W-Z}}return $}function EY(J,Q){let $=qY(J,Q);if(!$)return Q;let W=qK($,J);return m9(W,W.next),m9($,$.next)}function qY(J,Q){let $=Q,W=J.x,Z=J.y,K=-1/0,H;if(z8(J,$))return $;do{if(z8(J,$.next))return $.next;else if(Z<=$.y&&Z>=$.next.y&&$.next.y!==$.y){let E=$.x+(Z-$.y)*($.next.x-$.x)/($.next.y-$.y);if(E<=W&&E>K){if(K=E,H=$.x<$.next.x?$:$.next,E===W)return H}}$=$.next}while($!==Q);if(!H)return null;let Y=H,X=H.x,U=H.y,N=1/0;$=H;do{if(W>=$.x&&$.x>=X&&W!==$.x&&NK(Z<U?W:K,Z,X,U,Z<U?K:W,Z,$.x,$.y)){let E=Math.abs(Z-$.y)/(W-$.x);if(Q7($,J)&&(E<N||E===N&&($.x>H.x||$.x===H.x&&FY(H,$))))H=$,N=E}$=$.next}while($!==Y);return H}function FY(J,Q){return OJ(J.prev,J,Q.prev)<0&&OJ(Q.next,J,J.next)<0}function DY(J,Q,$,W){let Z=J;do{if(Z.z===0)Z.z=GQ(Z.x,Z.y,Q,$,W);Z.prevZ=Z.prev,Z.nextZ=Z.next,Z=Z.next}while(Z!==J);Z.prevZ.nextZ=null,Z.prevZ=null,OY(Z)}function OY(J){let Q,$=1;do{let W=J,Z;J=null;let K=null;Q=0;while(W){Q++;let H=W,Y=0;for(let U=0;U<$;U++)if(Y++,H=H.nextZ,!H)break;let X=$;while(Y>0||X>0&&H){if(Y!==0&&(X===0||!H||W.z<=H.z))Z=W,W=W.nextZ,Y--;else Z=H,H=H.nextZ,X--;if(K)K.nextZ=Z;else J=Z;Z.prevZ=K,K=Z}W=H}K.nextZ=null,$*=2}while(Q>1);return J}function GQ(J,Q,$,W,Z){return J=(J-$)*Z|0,Q=(Q-W)*Z|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,Q=(Q|Q<<8)&16711935,Q=(Q|Q<<4)&252645135,Q=(Q|Q<<2)&858993459,Q=(Q|Q<<1)&1431655765,J|Q<<1}function RY(J){let Q=J,$=J;do{if(Q.x<$.x||Q.x===$.x&&Q.y<$.y)$=Q;Q=Q.next}while(Q!==J);return $}function NK(J,Q,$,W,Z,K,H,Y){return(Z-H)*(Q-Y)>=(J-H)*(K-Y)&&(J-H)*(W-Y)>=($-H)*(Q-Y)&&($-H)*(K-Y)>=(Z-H)*(W-Y)}function n8(J,Q,$,W,Z,K,H,Y){return!(J===H&&Q===Y)&&NK(J,Q,$,W,Z,K,H,Y)}function MY(J,Q){return J.next.i!==Q.i&&J.prev.i!==Q.i&&!kY(J,Q)&&(Q7(J,Q)&&Q7(Q,J)&&LY(J,Q)&&(OJ(J.prev,J,Q.prev)||OJ(J,Q.prev,Q))||z8(J,Q)&&OJ(J.prev,J,J.next)>0&&OJ(Q.prev,Q,Q.next)>0)}function OJ(J,Q,$){return(Q.y-J.y)*($.x-Q.x)-(Q.x-J.x)*($.y-Q.y)}function z8(J,Q){return J.x===Q.x&&J.y===Q.y}function EK(J,Q,$,W){let Z=n7(OJ(J,Q,$)),K=n7(OJ(J,Q,W)),H=n7(OJ($,W,J)),Y=n7(OJ($,W,Q));if(Z!==K&&H!==Y)return!0;if(Z===0&&c7(J,$,Q))return!0;if(K===0&&c7(J,W,Q))return!0;if(H===0&&c7($,J,W))return!0;if(Y===0&&c7($,Q,W))return!0;return!1}function c7(J,Q,$){return Q.x<=Math.max(J.x,$.x)&&Q.x>=Math.min(J.x,$.x)&&Q.y<=Math.max(J.y,$.y)&&Q.y>=Math.min(J.y,$.y)}function n7(J){return J>0?1:J<0?-1:0}function kY(J,Q){let $=J;do{if($.i!==J.i&&$.next.i!==J.i&&$.i!==Q.i&&$.next.i!==Q.i&&EK($,$.next,J,Q))return!0;$=$.next}while($!==J);return!1}function Q7(J,Q){return OJ(J.prev,J,J.next)<0?OJ(J,Q,J.next)>=0&&OJ(J,J.prev,Q)>=0:OJ(J,Q,J.prev)<0||OJ(J,J.next,Q)<0}function LY(J,Q){let $=J,W=!1,Z=(J.x+Q.x)/2,K=(J.y+Q.y)/2;do{if($.y>K!==$.next.y>K&&$.next.y!==$.y&&Z<($.next.x-$.x)*(K-$.y)/($.next.y-$.y)+$.x)W=!W;$=$.next}while($!==J);return W}function qK(J,Q){let $=NQ(J.i,J.x,J.y),W=NQ(Q.i,Q.x,Q.y),Z=J.next,K=Q.prev;return J.next=Q,Q.prev=J,$.next=Z,Z.prev=$,W.next=$,$.prev=W,K.next=W,W.prev=K,W}function nW(J,Q,$,W){let Z=NQ(J,Q,$);if(!W)Z.prev=Z,Z.next=Z;else Z.next=W.next,Z.prev=W,W.next.prev=Z,W.next=Z;return Z}function $7(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function NQ(J,Q,$){return{i:J,x:Q,y:$,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function VY(J,Q,$,W){let Z=0;for(let K=Q,H=$-W;K<$;K+=W)Z+=(J[H]-J[K])*(J[K+1]+J[H+1]),H=K;return Z}class FK{static triangulate(J,Q,$=2){return KY(J,Q,$)}}class W9{static area(J){let Q=J.length,$=0;for(let W=Q-1,Z=0;Z<Q;W=Z++)$+=J[W].x*J[Z].y-J[Z].x*J[W].y;return $*0.5}static isClockWise(J){return W9.area(J)<0}static triangulateShape(J,Q){let $=[],W=[],Z=[];sW(J),iW($,J);let K=J.length;Q.forEach(sW);for(let Y=0;Y<Q.length;Y++)W.push(K),K+=Q[Y].length,iW($,Q[Y]);let H=FK.triangulate($,W);for(let Y=0;Y<H.length;Y+=3)Z.push(H.slice(Y,Y+3));return Z}}function sW(J){let Q=J.length;if(Q>2&&J[Q-1].equals(J[0]))J.pop()}function iW(J,Q){for(let $=0;$<Q.length;$++)J.push(Q[$].x),J.push(Q[$].y)}class _$ extends AJ{constructor(J=new C6([new Y0(0.5,0.5),new Y0(-0.5,0.5),new Y0(-0.5,-0.5),new Y0(0.5,-0.5)]),Q={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:Q},J=Array.isArray(J)?J:[J];let $=this,W=[],Z=[];for(let H=0,Y=J.length;H<Y;H++){let X=J[H];K(X)}this.setAttribute("position",new WJ(W,3)),this.setAttribute("uv",new WJ(Z,2)),this.computeVertexNormals();function K(H){let Y=[],X=Q.curveSegments!==void 0?Q.curveSegments:12,U=Q.steps!==void 0?Q.steps:1,N=Q.depth!==void 0?Q.depth:1,E=Q.bevelEnabled!==void 0?Q.bevelEnabled:!0,G=Q.bevelThickness!==void 0?Q.bevelThickness:0.2,D=Q.bevelSize!==void 0?Q.bevelSize:G-0.1,R=Q.bevelOffset!==void 0?Q.bevelOffset:0,B=Q.bevelSegments!==void 0?Q.bevelSegments:3,F=Q.extrudePath,q=Q.UVGenerator!==void 0?Q.UVGenerator:BY,A,C=!1,L,z,w,_;if(F){A=F.getSpacedPoints(U),C=!0,E=!1;let t=F.isCatmullRomCurve3?F.closed:!1;L=F.computeFrenetFrames(U,t),z=new S,w=new S,_=new S}if(!E)B=0,G=0,D=0,R=0;let M=H.extractPoints(X),I=M.shape,g=M.holes;if(!W9.isClockWise(I)){I=I.reverse();for(let t=0,$0=g.length;t<$0;t++){let K0=g[t];if(W9.isClockWise(K0))g[t]=K0.reverse()}}function h(t){let X0=t[0];for(let M0=1;M0<=t.length;M0++){let _0=M0%t.length,y0=t[_0],p0=y0.x-X0.x,d0=y0.y-X0.y,P=p0*p0+d0*d0,XJ=Math.max(Math.abs(y0.x),Math.abs(y0.y),Math.abs(X0.x),Math.abs(X0.y)),i0=0.000000000000000000010000000000000001*XJ*XJ;if(P<=i0){t.splice(_0,1),M0--;continue}X0=y0}}h(I),g.forEach(h);let i=g.length,T=I;for(let t=0;t<i;t++){let $0=g[t];I=I.concat($0)}function p(t,$0,K0){if(!$0)x0("ExtrudeGeometry: vec does not exist");return t.clone().addScaledVector($0,K0)}let o=I.length;function m(t,$0,K0){let X0,M0,_0,y0=t.x-$0.x,p0=t.y-$0.y,d0=K0.x-t.x,P=K0.y-t.y,XJ=y0*y0+p0*p0,i0=y0*P-p0*d0;if(Math.abs(i0)>Number.EPSILON){let o0=Math.sqrt(XJ),V=Math.sqrt(d0*d0+P*P),O=$0.x-p0/o0,j=$0.y+y0/o0,d=K0.x-P/V,e=K0.y+d0/V,U0=((d-O)*P-(e-j)*d0)/(y0*P-p0*d0);X0=O+y0*U0-t.x,M0=j+p0*U0-t.y;let N0=X0*X0+M0*M0;if(N0<=2)return new Y0(X0,M0);else _0=Math.sqrt(N0/2)}else{let o0=!1;if(y0>Number.EPSILON){if(d0>Number.EPSILON)o0=!0}else if(y0<-Number.EPSILON){if(d0<-Number.EPSILON)o0=!0}else if(Math.sign(p0)===Math.sign(P))o0=!0;if(o0)X0=-p0,M0=y0,_0=Math.sqrt(XJ);else X0=y0,M0=p0,_0=Math.sqrt(XJ/2)}return new Y0(X0/_0,M0/_0)}let Z0=[];for(let t=0,$0=T.length,K0=$0-1,X0=t+1;t<$0;t++,K0++,X0++){if(K0===$0)K0=0;if(X0===$0)X0=0;Z0[t]=m(T[t],T[K0],T[X0])}let u=[],r,Q0=Z0.concat();for(let t=0,$0=i;t<$0;t++){let K0=g[t];r=[];for(let X0=0,M0=K0.length,_0=M0-1,y0=X0+1;X0<M0;X0++,_0++,y0++){if(_0===M0)_0=0;if(y0===M0)y0=0;r[X0]=m(K0[X0],K0[_0],K0[y0])}u.push(r),Q0=Q0.concat(r)}let T0;if(B===0)T0=W9.triangulateShape(T,g);else{let t=[],$0=[];for(let K0=0;K0<B;K0++){let X0=K0/B,M0=G*Math.cos(X0*Math.PI/2),_0=D*Math.sin(X0*Math.PI/2)+R;for(let y0=0,p0=T.length;y0<p0;y0++){let d0=p(T[y0],Z0[y0],_0);if(W0(d0.x,d0.y,-M0),X0===0)t.push(d0)}for(let y0=0,p0=i;y0<p0;y0++){let d0=g[y0];r=u[y0];let P=[];for(let XJ=0,i0=d0.length;XJ<i0;XJ++){let o0=p(d0[XJ],r[XJ],_0);if(W0(o0.x,o0.y,-M0),X0===0)P.push(o0)}if(X0===0)$0.push(P)}}T0=W9.triangulateShape(t,$0)}let S0=T0.length,ZJ=D+R;for(let t=0;t<o;t++){let $0=E?p(I[t],Q0[t],ZJ):I[t];if(!C)W0($0.x,$0.y,0);else w.copy(L.normals[0]).multiplyScalar($0.x),z.copy(L.binormals[0]).multiplyScalar($0.y),_.copy(A[0]).add(w).add(z),W0(_.x,_.y,_.z)}for(let t=1;t<=U;t++)for(let $0=0;$0<o;$0++){let K0=E?p(I[$0],Q0[$0],ZJ):I[$0];if(!C)W0(K0.x,K0.y,N/U*t);else w.copy(L.normals[t]).multiplyScalar(K0.x),z.copy(L.binormals[t]).multiplyScalar(K0.y),_.copy(A[t]).add(w).add(z),W0(_.x,_.y,_.z)}for(let t=B-1;t>=0;t--){let $0=t/B,K0=G*Math.cos($0*Math.PI/2),X0=D*Math.sin($0*Math.PI/2)+R;for(let M0=0,_0=T.length;M0<_0;M0++){let y0=p(T[M0],Z0[M0],X0);W0(y0.x,y0.y,N+K0)}for(let M0=0,_0=g.length;M0<_0;M0++){let y0=g[M0];r=u[M0];for(let p0=0,d0=y0.length;p0<d0;p0++){let P=p(y0[p0],r[p0],X0);if(!C)W0(P.x,P.y,N+K0);else W0(P.x,P.y+A[U-1].y,A[U-1].x+K0)}}}u0(),n();function u0(){let t=W.length/3;if(E){let $0=0,K0=o*$0;for(let X0=0;X0<S0;X0++){let M0=T0[X0];j0(M0[2]+K0,M0[1]+K0,M0[0]+K0)}$0=U+B*2,K0=o*$0;for(let X0=0;X0<S0;X0++){let M0=T0[X0];j0(M0[0]+K0,M0[1]+K0,M0[2]+K0)}}else{for(let $0=0;$0<S0;$0++){let K0=T0[$0];j0(K0[2],K0[1],K0[0])}for(let $0=0;$0<S0;$0++){let K0=T0[$0];j0(K0[0]+o*U,K0[1]+o*U,K0[2]+o*U)}}$.addGroup(t,W.length/3-t,0)}function n(){let t=W.length/3,$0=0;H0(T,$0),$0+=T.length;for(let K0=0,X0=g.length;K0<X0;K0++){let M0=g[K0];H0(M0,$0),$0+=M0.length}$.addGroup(t,W.length/3-t,1)}function H0(t,$0){let K0=t.length;while(--K0>=0){let X0=K0,M0=K0-1;if(M0<0)M0=t.length-1;for(let _0=0,y0=U+B*2;_0<y0;_0++){let p0=o*_0,d0=o*(_0+1),P=$0+X0+p0,XJ=$0+M0+p0,i0=$0+M0+d0,o0=$0+X0+d0;h0(P,XJ,i0,o0)}}}function W0(t,$0,K0){Y.push(t),Y.push($0),Y.push(K0)}function j0(t,$0,K0){z0(t),z0($0),z0(K0);let X0=W.length/3,M0=q.generateTopUV($,W,X0-3,X0-2,X0-1);KJ(M0[0]),KJ(M0[1]),KJ(M0[2])}function h0(t,$0,K0,X0){z0(t),z0($0),z0(X0),z0($0),z0(K0),z0(X0);let M0=W.length/3,_0=q.generateSideWallUV($,W,M0-6,M0-3,M0-2,M0-1);KJ(_0[0]),KJ(_0[1]),KJ(_0[3]),KJ(_0[1]),KJ(_0[2]),KJ(_0[3])}function z0(t){W.push(Y[t*3+0]),W.push(Y[t*3+1]),W.push(Y[t*3+2])}function KJ(t){Z.push(t.x),Z.push(t.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes,$=this.parameters.options;return IY(Q,$,J)}static fromJSON(J,Q){let $=[];for(let Z=0,K=J.shapes.length;Z<K;Z++){let H=Q[J.shapes[Z]];$.push(H)}let W=J.options.extrudePath;if(W!==void 0)J.options.extrudePath=new t7[W.type]().fromJSON(W);return new _$($,J.options)}}var BY={generateTopUV:function(J,Q,$,W,Z){let K=Q[$*3],H=Q[$*3+1],Y=Q[W*3],X=Q[W*3+1],U=Q[Z*3],N=Q[Z*3+1];return[new Y0(K,H),new Y0(Y,X),new Y0(U,N)]},generateSideWallUV:function(J,Q,$,W,Z,K){let H=Q[$*3],Y=Q[$*3+1],X=Q[$*3+2],U=Q[W*3],N=Q[W*3+1],E=Q[W*3+2],G=Q[Z*3],D=Q[Z*3+1],R=Q[Z*3+2],B=Q[K*3],F=Q[K*3+1],q=Q[K*3+2];if(Math.abs(Y-N)<Math.abs(H-U))return[new Y0(H,1-X),new Y0(U,1-E),new Y0(G,1-R),new Y0(B,1-q)];else return[new Y0(Y,1-X),new Y0(N,1-E),new Y0(D,1-R),new Y0(F,1-q)]}};function IY(J,Q,$){if($.shapes=[],Array.isArray(J))for(let W=0,Z=J.length;W<Z;W++){let K=J[W];$.shapes.push(K.uuid)}else $.shapes.push(J.uuid);if($.options=Object.assign({},Q),Q.extrudePath!==void 0)$.options.extrudePath=Q.extrudePath.toJSON();return $}class F7 extends AJ{constructor(J=1,Q=1,$=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:W};let Z=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(W),X=H+1,U=Y+1,N=J/H,E=Q/Y,G=[],D=[],R=[],B=[];for(let F=0;F<U;F++){let q=F*E-K;for(let A=0;A<X;A++){let C=A*N-Z;D.push(C,-q,0),R.push(0,0,1),B.push(A/H),B.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let q=0;q<H;q++){let A=q+X*F,C=q+X*(F+1),L=q+1+X*(F+1),z=q+1+X*F;G.push(A,C,z),G.push(C,L,z)}this.setIndex(G),this.setAttribute("position",new WJ(D,3)),this.setAttribute("normal",new WJ(R,3)),this.setAttribute("uv",new WJ(B,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new F7(J.width,J.height,J.widthSegments,J.heightSegments)}}class P$ extends AJ{constructor(J=new C6([new Y0(0,0.5),new Y0(-0.5,-0.5),new Y0(0.5,-0.5)]),Q=12){super();this.type="ShapeGeometry",this.parameters={shapes:J,curveSegments:Q};let $=[],W=[],Z=[],K=[],H=0,Y=0;if(Array.isArray(J)===!1)X(J);else for(let U=0;U<J.length;U++)X(J[U]),this.addGroup(H,Y,U),H+=Y,Y=0;this.setIndex($),this.setAttribute("position",new WJ(W,3)),this.setAttribute("normal",new WJ(Z,3)),this.setAttribute("uv",new WJ(K,2));function X(U){let N=W.length/3,E=U.extractPoints(Q),G=E.shape,D=E.holes;if(W9.isClockWise(G)===!1)G=G.reverse();for(let B=0,F=D.length;B<F;B++){let q=D[B];if(W9.isClockWise(q)===!0)D[B]=q.reverse()}let R=W9.triangulateShape(G,D);for(let B=0,F=D.length;B<F;B++){let q=D[B];G=G.concat(q)}for(let B=0,F=G.length;B<F;B++){let q=G[B];W.push(q.x,q.y,0),Z.push(0,0,1),K.push(q.x,q.y)}for(let B=0,F=R.length;B<F;B++){let q=R[B],A=q[0]+N,C=q[1]+N,L=q[2]+N;$.push(A,C,L),Y+=3}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes;return zY(Q,J)}static fromJSON(J,Q){let $=[];for(let W=0,Z=J.shapes.length;W<Z;W++){let K=Q[J.shapes[W]];$.push(K)}return new P$($,J.curveSegments)}}function zY(J,Q){if(Q.shapes=[],Array.isArray(J))for(let $=0,W=J.length;$<W;$++){let Z=J[$];Q.shapes.push(Z.uuid)}else Q.shapes.push(J.uuid);return Q}class T$ extends AJ{constructor(J=1,Q=32,$=16,W=0,Z=Math.PI*2,K=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:W,phiLength:Z,thetaStart:K,thetaLength:H},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let Y=Math.min(K+H,Math.PI),X=0,U=[],N=new S,E=new S,G=[],D=[],R=[],B=[];for(let F=0;F<=$;F++){let q=[],A=F/$,C=K+A*H,L=J*Math.cos(C),z=Math.sqrt(J*J-L*L),w=0;if(F===0&&K===0)w=0.5/Q;else if(F===$&&Y===Math.PI)w=-0.5/Q;for(let _=0;_<=Q;_++){let M=_/Q,I=W+M*Z;N.x=-z*Math.cos(I),N.y=L,N.z=z*Math.sin(I),D.push(N.x,N.y,N.z),E.copy(N).normalize(),R.push(E.x,E.y,E.z),B.push(M+w,1-A),q.push(X++)}U.push(q)}for(let F=0;F<$;F++)for(let q=0;q<Q;q++){let A=U[F][q+1],C=U[F][q],L=U[F+1][q],z=U[F+1][q+1];if(F!==0||K>0)G.push(A,C,z);if(F!==$-1||Y<Math.PI)G.push(C,L,z)}this.setIndex(G),this.setAttribute("position",new WJ(D,3)),this.setAttribute("normal",new WJ(R,3)),this.setAttribute("uv",new WJ(B,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new T$(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class S$ extends AJ{constructor(J=1,Q=0.4,$=12,W=48,Z=Math.PI*2,K=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:$,tubularSegments:W,arc:Z,thetaStart:K,thetaLength:H},$=Math.floor($),W=Math.floor(W);let Y=[],X=[],U=[],N=[],E=new S,G=new S,D=new S;for(let R=0;R<=$;R++){let B=K+R/$*H;for(let F=0;F<=W;F++){let q=F/W*Z;G.x=(J+Q*Math.cos(B))*Math.cos(q),G.y=(J+Q*Math.cos(B))*Math.sin(q),G.z=Q*Math.sin(B),X.push(G.x,G.y,G.z),E.x=J*Math.cos(q),E.y=J*Math.sin(q),D.subVectors(G,E).normalize(),U.push(D.x,D.y,D.z),N.push(F/W),N.push(R/$)}}for(let R=1;R<=$;R++)for(let B=1;B<=W;B++){let F=(W+1)*R+B-1,q=(W+1)*(R-1)+B-1,A=(W+1)*(R-1)+B,C=(W+1)*R+B;Y.push(F,q,C),Y.push(q,A,C)}this.setIndex(Y),this.setAttribute("position",new WJ(X,3)),this.setAttribute("normal",new WJ(U,3)),this.setAttribute("uv",new WJ(N,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new S$(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class j$ extends AJ{constructor(J=new z6(new S(-1,-1,0),new S(-1,1,0),new S(1,1,0)),Q=64,$=1,W=8,Z=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:Q,radius:$,radialSegments:W,closed:Z};let K=J.computeFrenetFrames(Q,Z);this.tangents=K.tangents,this.normals=K.normals,this.binormals=K.binormals;let H=new S,Y=new S,X=new Y0,U=new S,N=[],E=[],G=[],D=[];R(),this.setIndex(D),this.setAttribute("position",new WJ(N,3)),this.setAttribute("normal",new WJ(E,3)),this.setAttribute("uv",new WJ(G,2));function R(){for(let A=0;A<Q;A++)B(A);B(Z===!1?Q:0),q(),F()}function B(A){U=J.getPointAt(A/Q,U);let C=K.normals[A],L=K.binormals[A];for(let z=0;z<=W;z++){let w=z/W*Math.PI*2,_=Math.sin(w),M=-Math.cos(w);Y.x=M*C.x+_*L.x,Y.y=M*C.y+_*L.y,Y.z=M*C.z+_*L.z,Y.normalize(),E.push(Y.x,Y.y,Y.z),H.x=U.x+$*Y.x,H.y=U.y+$*Y.y,H.z=U.z+$*Y.z,N.push(H.x,H.y,H.z)}}function F(){for(let A=1;A<=Q;A++)for(let C=1;C<=W;C++){let L=(W+1)*(A-1)+(C-1),z=(W+1)*A+(C-1),w=(W+1)*A+C,_=(W+1)*(A-1)+C;D.push(L,z,_),D.push(z,w,_)}}function q(){for(let A=0;A<=Q;A++)for(let C=0;C<=W;C++)X.x=A/Q,X.y=C/W,G.push(X.x,X.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new j$(new t7[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class DK extends tJ{constructor(J){super();this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new m0(0),this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.fog=J.fog,this}}function o9(J){let Q={};for(let $ in J){Q[$]={};for(let W in J[$]){let Z=J[$][W];if(oW(Z))if(Z.isRenderTargetTexture)f0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][W]=null;else Q[$][W]=Z.clone();else if(Array.isArray(Z))if(oW(Z[0])){let K=[];for(let H=0,Y=Z.length;H<Y;H++)K[H]=Z[H].clone();Q[$][W]=K}else Q[$][W]=Z.slice();else Q[$][W]=Z}}return Q}function SJ(J){let Q={};for(let $=0;$<J.length;$++){let W=o9(J[$]);for(let Z in W)Q[Z]=W[Z]}return Q}function oW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function AY(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function y$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return r0.workingColorSpace}var OK={clone:o9,merge:SJ},CY=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wY=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class uJ extends tJ{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=CY,this.fragmentShader=wY,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=o9(J.uniforms),this.uniformsGroups=AY(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let W in this.uniforms){let K=this.uniforms[W].value;if(K&&K.isTexture)Q.uniforms[W]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[W]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[W]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[W]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[W]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[W]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[W]={type:"m4",value:K.toArray()};else Q.uniforms[W]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let W in this.extensions)if(this.extensions[W]===!0)$[W]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let W=J.uniforms[$];switch(this.uniforms[$]={},W.type){case"t":this.uniforms[$].value=Q[W.value]||null;break;case"c":this.uniforms[$].value=new m0().setHex(W.value);break;case"v2":this.uniforms[$].value=new Y0().fromArray(W.value);break;case"v3":this.uniforms[$].value=new S().fromArray(W.value);break;case"v4":this.uniforms[$].value=new DJ().fromArray(W.value);break;case"m3":this.uniforms[$].value=new g0().fromArray(W.value);break;case"m4":this.uniforms[$].value=new JJ().fromArray(W.value);break;default:this.uniforms[$].value=W.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class v$ extends uJ{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class T8 extends tJ{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new m0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new m0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new K9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class RK extends T8{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Y0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return s0(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(Q){this.ior=(1+0.4*Q)/(1-0.4*Q)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new m0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new m0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new m0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(J){if(this._retroreflectivity>0!==J>0)this.version++;this._retroreflectivity=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.retroreflectivity=J.retroreflectivity,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class w6 extends tJ{constructor(J){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new m0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new m0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new K9,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.envMapIntensity=J.envMapIntensity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class f$ extends tJ{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class h$ extends tJ{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function R8(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function XQ(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class a9{constructor(J,Q,$,W){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,W=Q[$],Z=Q[$-1];$:{J:{let K;Q:{W:if(!(J<W)){for(let H=$+2;;){if(W===void 0){if(J<Z)break W;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(Z=W,W=Q[++$],J<W)break J}K=Q.length;break Q}if(!(J>=Z)){let H=Q[1];if(J<H)$=2,Z=H;for(let Y=$-2;;){if(Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(W=Z,Z=Q[--$-1],J>=Z)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(W=Q[$],Z=Q[$-1],Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,Z,W)}return this.interpolate_($,Z,J,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,W=this.valueSize,Z=J*W;for(let K=0;K!==W;++K)Q[K]=$[Z+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class b$ extends a9{constructor(J,Q,$,W){super(J,Q,$,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let W=this.parameterPositions,Z=J-2,K=J+1,H=W[Z],Y=W[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Z=J,H=2*Q-$;break;case 2402:Z=W.length-2,H=Q+W[Z]-W[Z+1];break;default:Z=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+W[1]-W[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=Z*U,this._offsetNext=K*U}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,N=this._offsetNext,E=this._weightPrev,G=this._weightNext,D=($-Q)/(W-Q),R=D*D,B=R*D,F=-E*B+2*E*R-E*D,q=(1+E)*B+(-1.5-2*E)*R+(-0.5+E)*D+1,A=(-1-G)*B+(1.5+G)*R+0.5*D,C=G*B-G*R;for(let L=0;L!==H;++L)Z[L]=F*K[U+L]+q*K[X+L]+A*K[Y+L]+C*K[N+L];return Z}}class x$ extends a9{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(W-Q),N=1-U;for(let E=0;E!==H;++E)Z[E]=K[X+E]*N+K[Y+E]*U;return Z}}class g$ extends a9{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J){return this.copySampleValue_(J-1)}}class p$ extends a9{interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,N=this.outTangents;if(!U||!N){let D=($-Q)/(W-Q),R=1-D;for(let B=0;B!==H;++B)Z[B]=K[X+B]*R+K[Y+B]*D;return Z}let E=H*2,G=J-1;for(let D=0;D!==H;++D){let R=K[X+D],B=K[Y+D],F=G*E+D*2,q=N[F],A=N[F+1],C=J*E+D*2,L=U[C],z=U[C+1],w=PY($,Q,q,L,W);Z[D]=MK(w,R,A,z,B)}return Z}}function MK(J,Q,$,W,Z){let K=1-J;return K*K*K*Q+3*K*K*J*$+3*K*J*J*W+J*J*J*Z}function _Y(J,Q,$,W,Z){let K=1-J;return 3*K*K*($-Q)+6*K*J*(W-$)+3*J*J*(Z-W)}function PY(J,Q,$,W,Z){let K=(J-Q)/(Z-Q);for(let H=0;H<8;H++){let Y=MK(K,Q,$,W,Z)-J;if(Math.abs(Y)<0.0000000001)break;let X=_Y(K,Q,$,W,Z);if(Math.abs(X)<0.0000000001)break;K=Math.max(0,Math.min(1,K-Y/X))}return K}class cJ{constructor(J,Q,$,W){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=R8(Q,this.TimeBufferType),this.values=R8($,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:R8(J.times,Array),values:R8(J.values,Array)};let W=J.getInterpolation();if(W!==J.DefaultInterpolation)$.interpolation=W;if(XQ(J.settings))$.settings={inTangents:R8(J.settings.inTangents,Array),outTangents:R8(J.settings.outTangents,Array)}}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new g$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new x$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new b$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new p$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return f0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]*=J;if(XQ(this.settings))aW(this.settings.inTangents,J),aW(this.settings.outTangents,J)}return this}trim(J,Q){let $=this.times,W=$.length,Z=0,K=W-1;while(Z!==W&&$[Z]<J)++Z;while(K!==-1&&$[K]>Q)--K;if(++K,Z!==0||K!==W){if(Z>=K)K=Math.max(K,1),Z=K-1;let H=this.getValueSize();this.times=$.slice(Z,K),this.values=this.values.slice(Z*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)x0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,W=this.values,Z=$.length;if(Z===0)x0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==Z;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){x0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){x0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(W!==void 0){if(DH(W))for(let H=0,Y=W.length;H!==Y;++H){let X=W[H];if(isNaN(X)){x0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),W=this.getInterpolation()===2302,Z=J.length-1,K=1;for(let H=1;H<Z;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!W){let N=H*$,E=N-$,G=N+$;for(let D=0;D!==$;++D){let R=Q[N+D];if(R!==Q[E+D]||R!==Q[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let N=H*$,E=K*$;for(let G=0;G!==$;++G)Q[E+G]=Q[N+G]}++K}}if(Z>0){J[K]=J[Z];for(let H=Z*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),W=new this.constructor(this.name,J,Q);if(W.createInterpolant=this.createInterpolant,XQ(this.settings))W.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return W}}function aW(J,Q){for(let $=0,W=J.length;$!==W;$+=2)J[$]*=Q}cJ.prototype.ValueTypeName="";cJ.prototype.TimeBufferType=Float32Array;cJ.prototype.ValueBufferType=Float32Array;cJ.prototype.DefaultInterpolation=2301;class r9 extends cJ{constructor(J,Q,$){super(J,Q,$)}}r9.prototype.ValueTypeName="bool";r9.prototype.ValueBufferType=Array;r9.prototype.DefaultInterpolation=2300;r9.prototype.InterpolantFactoryMethodLinear=void 0;r9.prototype.InterpolantFactoryMethodSmooth=void 0;class m$ extends cJ{constructor(J,Q,$,W){super(J,Q,$,W)}}m$.prototype.ValueTypeName="color";class d$ extends cJ{constructor(J,Q,$,W){super(J,Q,$,W)}}d$.prototype.ValueTypeName="number";class l$ extends a9{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(W-Q),X=J*H;for(let U=X+H;X!==U;X+=4)V9.slerpFlat(Z,0,K,X-H,K,X,Y);return Z}}class _6 extends cJ{constructor(J,Q,$,W){super(J,Q,$,W)}InterpolantFactoryMethodLinear(J){return new l$(this.times,this.values,this.getValueSize(),J)}}_6.prototype.ValueTypeName="quaternion";_6.prototype.InterpolantFactoryMethodSmooth=void 0;class t9 extends cJ{constructor(J,Q,$){super(J,Q,$)}}t9.prototype.ValueTypeName="string";t9.prototype.ValueBufferType=Array;t9.prototype.DefaultInterpolation=2300;t9.prototype.InterpolantFactoryMethodLinear=void 0;t9.prototype.InterpolantFactoryMethodSmooth=void 0;class u$ extends cJ{constructor(J,Q,$,W){super(J,Q,$,W)}}u$.prototype.ValueTypeName="vector";class c${constructor(J,Q,$){let W=this,Z=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,Z===!1){if(W.onStart!==void 0)W.onStart(U,K,H)}Z=!0},this.itemEnd=function(U){if(K++,W.onProgress!==void 0)W.onProgress(U,K,H);if(K===H){if(Z=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(U){if(W.onError!==void 0)W.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,N){return X.push(U,N),this},this.removeHandler=function(U){let N=X.indexOf(U);if(N!==-1)X.splice(N,2);return this},this.getHandler=function(U){for(let N=0,E=X.length;N<E;N+=2){let G=X[N],D=X[N+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var kK=new c$;class n${constructor(J){if(this.manager=J!==void 0?J:kK,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(W,Z){$.load(J,W,Q,Z)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}n$.DEFAULT_MATERIAL_NAME="__DEFAULT";class S8 extends RJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new m0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class LK extends S8{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(RJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new m0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var UQ=new JJ,rW=new S,tW=new S;class P6{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Y0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new JJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new E7,this._frameExtents=new Y0(1,1),this._viewportCount=1,this._viewports=[new DJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;rW.setFromMatrixPosition(J.matrixWorld),Q.position.copy(rW),tW.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(tW),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,$,W){UQ.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),$.setFromProjectionMatrix(UQ,J.coordinateSystem,J.reversedDepth);let Z=this._frameExtents,K=W?W.z/Z.x:1,H=W?W.w/Z.y:1,Y=W?W.x/Z.x:0,X=W?W.y/Z.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*K,0,0,0.5*K+Y,0,0.5*H,0,0.5*H+X,0,0,1,0,0,0,0,1);else Q.set(0.5*K,0,0,0.5*K+Y,0,0.5*H,0,0.5*H+X,0,0,0.5,0.5,0,0,0,1);Q.multiply(UQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var s7=new S,i7=new V9,Q9=new S;class T6 extends RJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new JJ,this.projectionMatrix=new JJ,this.projectionMatrixInverse=new JJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(s7,i7,Q9),Q9.x===1&&Q9.y===1&&Q9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(s7,i7,Q9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(s7,i7,Q9),Q9.x===1&&Q9.y===1&&Q9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(s7,i7,Q9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var T9=new S,eW=new Y0,JZ=new Y0;class vJ extends T6{constructor(J=50,Q=1,$=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=W,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=I8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(s8*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return I8*2*Math.atan(Math.tan(s8*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){T9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(T9.x,T9.y).multiplyScalar(-J/T9.z),T9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(T9.x,T9.y).multiplyScalar(-J/T9.z)}getViewSize(J,Q){return this.getViewBounds(J,eW,JZ),Q.subVectors(JZ,eW)}setViewOffset(J,Q,$,W,Z,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(s8*0.5*this.fov)/this.zoom,$=2*Q,W=this.aspect*$,Z=-0.5*W,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;Z+=K.offsetX*W/Y,Q-=K.offsetY*$/X,W*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)Z+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Z,Z+W,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class VK extends P6{constructor(){super(new vJ(90,1,0.5,500));this.isPointLightShadow=!0}}class S6 extends S8{constructor(J,Q,$=0,W=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=$,this.decay=W,this.shadow=new VK}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}}class D7 extends T6{constructor(J=-1,Q=1,$=1,W=-1,Z=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=W,this.near=Z,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,W,Z,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,W=(this.top+this.bottom)/2,Z=$-J,K=$+J,H=W+Q,Y=W-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Z+=X*this.view.offsetX,K=Z+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(Z,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class BK extends P6{constructor(){super(new D7(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class IK extends S8{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(RJ.DEFAULT_UP),this.updateMatrix(),this.target=new RJ,this.shadow=new BK}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class zK extends S8{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var M8=-90,k8=1;class s$ extends RJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let W=new vJ(M8,k8,J,Q);W.layers=this.layers,this.add(W);let Z=new vJ(M8,k8,J,Q);Z.layers=this.layers,this.add(Z);let K=new vJ(M8,k8,J,Q);K.layers=this.layers,this.add(K);let H=new vJ(M8,k8,J,Q);H.layers=this.layers,this.add(H);let Y=new vJ(M8,k8,J,Q);Y.layers=this.layers,this.add(Y);let X=new vJ(M8,k8,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,W,Z,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),W.up.set(0,1,0),W.lookAt(-1,0,0),Z.up.set(0,0,-1),Z.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),W.up.set(0,-1,0),W.lookAt(1,0,0),Z.up.set(0,0,1),Z.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:W}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[Z,K,H,Y,X,U]=this.children,N=J.getRenderTarget(),E=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let R=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let B=!1;if(J.isWebGLRenderer===!0)B=J.state.buffers.depth.getReversed();else B=J.reversedDepthBuffer;if(J.setRenderTarget($,0,W),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Z),J.setRenderTarget($,1,W),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,W),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,W),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,W),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=R,J.setRenderTarget($,5,W),B&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(N,E,G),J.xr.enabled=D,$.texture.needsPMREMUpdate=!0}}class i$ extends vJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var o$="\\[\\]\\.:\\/",TY=new RegExp("["+o$+"]","g"),a$="[^"+o$+"]",SY="[^"+o$.replace("\\.","")+"]",jY=/((?:WC+[\/:])*)/.source.replace("WC",a$),yY=/(WCOD+)?/.source.replace("WCOD",SY),vY=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",a$),fY=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",a$),hY=new RegExp("^"+jY+yY+vY+fY+"$"),bY=["material","materials","bones","map"];class AK{constructor(J,Q,$){let W=$||YJ.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,W)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,W=this._bindings[$];if(W!==void 0)W.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let W=this._targetGroup.nCachedObjects_,Z=$.length;W!==Z;++W)$[W].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class YJ{constructor(J,Q,$){this.path=Q,this.parsedPath=$||YJ.parseTrackName(Q),this.node=YJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new YJ(J,Q,$);else return new YJ.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(TY,"")}static parseTrackName(J){let Q=hY.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},W=$.nodeName&&$.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let Z=$.nodeName.substring(W+1);if(bY.indexOf(Z)!==-1)$.nodeName=$.nodeName.substring(0,W),$.objectName=Z}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(Z){for(let K=0;K<Z.length;K++){let H=Z[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},W=$(J.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)J[Q++]=$[W]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,W=Q.propertyName,Z=Q.propertyIndex;if(!J)J=YJ.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){f0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){x0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){x0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){x0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){x0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){x0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){x0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){x0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[W];if(K===void 0){let X=Q.nodeName;x0("PropertyBinding: Trying to update property for track: "+X+"."+W+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(Z!==void 0){if(W==="morphTargetInfluences"){if(!J.geometry){x0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){x0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[Z]!==void 0)Z=J.morphTargetDictionary[Z]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=Z}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=W;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}YJ.Composite=AK;YJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};YJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};YJ.prototype.GetterByBindingType=[YJ.prototype._getValue_direct,YJ.prototype._getValue_array,YJ.prototype._getValue_arrayElement,YJ.prototype._getValue_toArray];YJ.prototype.SetterByBindingTypeAndVersioning=[[YJ.prototype._setValue_direct,YJ.prototype._setValue_direct_setNeedsUpdate,YJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[YJ.prototype._setValue_array,YJ.prototype._setValue_array_setNeedsUpdate,YJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[YJ.prototype._setValue_arrayElement,YJ.prototype._setValue_arrayElement_setNeedsUpdate,YJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[YJ.prototype._setValue_fromArray,YJ.prototype._setValue_fromArray_setNeedsUpdate,YJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var T5=new Float32Array(1);var QZ=new JJ;class CK{constructor(J,Q,$=0,W=1/0){this.ray=new N7(J,Q),this.near=$,this.far=W,this.camera=null,this.layers=new U7,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,Q){this.ray.set(J,Q)}setFromCamera(J,Q){if(Q.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(Q.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject(Q).sub(this.ray.origin).normalize(),this.camera=Q;else if(Q.isOrthographicCamera)this.ray.origin.set(J.x,J.y,Q.projectionMatrix.elements[14]).unproject(Q),this.ray.direction.set(0,0,-1).transformDirection(Q.matrixWorld),this.camera=Q;else x0("Raycaster: Unsupported camera type: "+Q.type)}setFromXRController(J){return QZ.identity().extractRotation(J.matrixWorld),this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(QZ),this}intersectObject(J,Q=!0,$=[]){return EQ(J,this,$,Q),$.sort($Z),$}intersectObjects(J,Q=!0,$=[]){for(let W=0,Z=J.length;W<Z;W++)EQ(J[W],this,$,Q);return $.sort($Z),$}}function $Z(J,Q){return J.distance-Q.distance}function EQ(J,Q,$,W){let Z=!0;if(J.layers.test(Q.layers)){if(J.raycast(Q,$)===!1)Z=!1}if(Z===!0&&W===!0){let K=J.children;for(let H=0,Y=K.length;H<Y;H++)EQ(K[H],Q,$,!0)}}class r${static{r$.prototype.isMatrix2=!0}constructor(J,Q,$,W){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,W)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,W){let Z=this.elements;return Z[0]=J,Z[2]=Q,Z[1]=$,Z[3]=W,this}}function t$(J,Q,$,W){let Z=xY(W);switch($){case 1021:return J*Q;case 1028:return J*Q/Z.components*Z.byteLength;case 1029:return J*Q/Z.components*Z.byteLength;case 1030:return J*Q*2/Z.components*Z.byteLength;case 1031:return J*Q*2/Z.components*Z.byteLength;case 1022:return J*Q*3/Z.components*Z.byteLength;case 1023:return J*Q*4/Z.components*Z.byteLength;case 1033:return J*Q*4/Z.components*Z.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function xY(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)f0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function iK(){let J=null,Q=!1,$=null,W=null;function Z(K,H){W=J.requestAnimationFrame(Z),$(K,H)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;W=J.requestAnimationFrame(Z),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(W);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function gY(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:N}=Y,E=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,N),Y.onUploadCallback();let D;if(U instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=J.SHORT;else if(U instanceof Uint32Array)D=J.UNSIGNED_INT;else if(U instanceof Int32Array)D=J.INT;else if(U instanceof Int8Array)D=J.BYTE;else if(U instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:E}}function W(Y,X,U){let{array:N,updateRanges:E}=X;if(J.bindBuffer(U,Y),E.length===0)J.bufferSubData(U,0,N);else{E.sort((D,R)=>D.start-R.start);let G=0;for(let D=1;D<E.length;D++){let R=E[G],B=E[D];if(B.start<=R.start+R.count+1)R.count=Math.max(R.count,B.start+B.count-R.start);else++G,E[G]=B}E.length=G+1;for(let D=0,R=E.length;D<R;D++){let B=E[D];J.bufferSubData(U,B.start*N.BYTES_PER_ELEMENT,N,B.start,B.count)}X.clearUpdateRanges()}X.onUploadCallback()}function Z(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=Q.get(Y);if(!N||N.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(U.buffer,Y,X),U.version=Y.version}}return{get:Z,remove:K,update:H}}var pY=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mY=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dY=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lY=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uY=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cY=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nY=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sY=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iY=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,oY=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,aY=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rY=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tY=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,eY=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,JX=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,QX=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$X=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ZX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,KX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,HX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,YX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,XX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,UX=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,GX=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,NX=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,EX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,FX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,DX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,OX="gl_FragColor = linearToOutputTexel( gl_FragColor );",RX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,MX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,LX=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,VX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,IX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,CX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wX=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_X=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TX=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,SX=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,jX=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,yX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vX=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hX=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bX=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xX=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gX=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pX=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mX=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dX=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,lX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,iX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,oX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,aX=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eX=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,JU=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,QU=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$U=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,WU=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZU=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,KU=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,HU=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YU=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XU=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,UU=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,GU=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,NU=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,EU=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qU=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,FU=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DU=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,OU=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,RU=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,MU=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kU=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,LU=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,VU=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,BU=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,IU=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zU=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,AU=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,CU=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wU=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_U=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,PU=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,TU=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,SU=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jU=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yU=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vU=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fU=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gU=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,pU=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mU=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lU=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cU=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sU=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,iU=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,oU=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,aU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rU=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tU=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eU=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,JG=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,QG=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$G=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WG=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZG=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,KG=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HG=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,YG=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,XG=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UG=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GG=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,NG=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EG=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qG=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FG=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,DG=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OG=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RG=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,MG=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kG=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,n0={alphahash_fragment:pY,alphahash_pars_fragment:mY,alphamap_fragment:dY,alphamap_pars_fragment:lY,alphatest_fragment:uY,alphatest_pars_fragment:cY,aomap_fragment:nY,aomap_pars_fragment:sY,batching_pars_vertex:iY,batching_vertex:oY,begin_vertex:aY,beginnormal_vertex:rY,bsdfs:tY,iridescence_fragment:eY,bumpmap_pars_fragment:JX,clipping_planes_fragment:QX,clipping_planes_pars_fragment:$X,clipping_planes_pars_vertex:WX,clipping_planes_vertex:ZX,color_fragment:KX,color_pars_fragment:HX,color_pars_vertex:YX,color_vertex:XX,common:UX,cube_uv_reflection_fragment:GX,defaultnormal_vertex:NX,displacementmap_pars_vertex:EX,displacementmap_vertex:qX,emissivemap_fragment:FX,emissivemap_pars_fragment:DX,colorspace_fragment:OX,colorspace_pars_fragment:RX,envmap_fragment:MX,envmap_common_pars_fragment:kX,envmap_pars_fragment:LX,envmap_pars_vertex:VX,envmap_physical_pars_fragment:jX,envmap_vertex:BX,fog_vertex:IX,fog_pars_vertex:zX,fog_fragment:AX,fog_pars_fragment:CX,gradientmap_pars_fragment:wX,lightmap_pars_fragment:_X,lights_lambert_fragment:PX,lights_lambert_pars_fragment:TX,lights_pars_begin:SX,lights_toon_fragment:yX,lights_toon_pars_fragment:vX,lights_phong_fragment:fX,lights_phong_pars_fragment:hX,lights_physical_fragment:bX,lights_physical_pars_fragment:xX,lights_fragment_begin:gX,lights_fragment_maps:pX,lights_fragment_end:mX,lightprobes_pars_fragment:dX,logdepthbuf_fragment:lX,logdepthbuf_pars_fragment:uX,logdepthbuf_pars_vertex:cX,logdepthbuf_vertex:nX,map_fragment:sX,map_pars_fragment:iX,map_particle_fragment:oX,map_particle_pars_fragment:aX,metalnessmap_fragment:rX,metalnessmap_pars_fragment:tX,morphinstance_vertex:eX,morphcolor_vertex:JU,morphnormal_vertex:QU,morphtarget_pars_vertex:$U,morphtarget_vertex:WU,normal_fragment_begin:ZU,normal_fragment_maps:KU,normal_pars_fragment:HU,normal_pars_vertex:YU,normal_vertex:XU,normalmap_pars_fragment:UU,clearcoat_normal_fragment_begin:GU,clearcoat_normal_fragment_maps:NU,clearcoat_pars_fragment:EU,iridescence_pars_fragment:qU,opaque_fragment:FU,packing:DU,premultiplied_alpha_fragment:OU,project_vertex:RU,dithering_fragment:MU,dithering_pars_fragment:kU,roughnessmap_fragment:LU,roughnessmap_pars_fragment:VU,shadowmap_pars_fragment:BU,shadowmap_pars_vertex:IU,shadowmap_vertex:zU,shadowmask_pars_fragment:AU,skinbase_vertex:CU,skinning_pars_vertex:wU,skinning_vertex:_U,skinnormal_vertex:PU,specularmap_fragment:TU,specularmap_pars_fragment:SU,tonemapping_fragment:jU,tonemapping_pars_fragment:yU,transmission_fragment:vU,transmission_pars_fragment:fU,uv_pars_fragment:hU,uv_pars_vertex:bU,uv_vertex:xU,worldpos_vertex:gU,background_vert:pU,background_frag:mU,backgroundCube_vert:dU,backgroundCube_frag:lU,cube_vert:uU,cube_frag:cU,depth_vert:nU,depth_frag:sU,distance_vert:iU,distance_frag:oU,equirect_vert:aU,equirect_frag:rU,linedashed_vert:tU,linedashed_frag:eU,meshbasic_vert:JG,meshbasic_frag:QG,meshlambert_vert:$G,meshlambert_frag:WG,meshmatcap_vert:ZG,meshmatcap_frag:KG,meshnormal_vert:HG,meshnormal_frag:YG,meshphong_vert:XG,meshphong_frag:UG,meshphysical_vert:GG,meshphysical_frag:NG,meshtoon_vert:EG,meshtoon_frag:qG,points_vert:FG,points_frag:DG,shadow_vert:OG,shadow_frag:RG,sprite_vert:MG,sprite_frag:kG},D0={common:{diffuse:{value:new m0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new g0},alphaMap:{value:null},alphaMapTransform:{value:new g0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new g0}},envmap:{envMap:{value:null},envMapRotation:{value:new g0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new g0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new g0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new g0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new g0},normalScale:{value:new Y0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new g0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new g0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new g0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new g0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new m0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new S},probesMax:{value:new S},probesResolution:{value:new S}},points:{diffuse:{value:new m0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new g0},alphaTest:{value:0},uvTransform:{value:new g0}},sprite:{diffuse:{value:new m0(16777215)},opacity:{value:1},center:{value:new Y0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new g0},alphaMap:{value:null},alphaMapTransform:{value:new g0},alphaTest:{value:0}}},N9={basic:{uniforms:SJ([D0.common,D0.specularmap,D0.envmap,D0.aomap,D0.lightmap,D0.fog]),vertexShader:n0.meshbasic_vert,fragmentShader:n0.meshbasic_frag},lambert:{uniforms:SJ([D0.common,D0.specularmap,D0.envmap,D0.aomap,D0.lightmap,D0.emissivemap,D0.bumpmap,D0.normalmap,D0.displacementmap,D0.fog,D0.lights,{emissive:{value:new m0(0)},envMapIntensity:{value:1}}]),vertexShader:n0.meshlambert_vert,fragmentShader:n0.meshlambert_frag},phong:{uniforms:SJ([D0.common,D0.specularmap,D0.envmap,D0.aomap,D0.lightmap,D0.emissivemap,D0.bumpmap,D0.normalmap,D0.displacementmap,D0.fog,D0.lights,{emissive:{value:new m0(0)},specular:{value:new m0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:n0.meshphong_vert,fragmentShader:n0.meshphong_frag},standard:{uniforms:SJ([D0.common,D0.envmap,D0.aomap,D0.lightmap,D0.emissivemap,D0.bumpmap,D0.normalmap,D0.displacementmap,D0.roughnessmap,D0.metalnessmap,D0.fog,D0.lights,{emissive:{value:new m0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:n0.meshphysical_vert,fragmentShader:n0.meshphysical_frag},toon:{uniforms:SJ([D0.common,D0.aomap,D0.lightmap,D0.emissivemap,D0.bumpmap,D0.normalmap,D0.displacementmap,D0.gradientmap,D0.fog,D0.lights,{emissive:{value:new m0(0)}}]),vertexShader:n0.meshtoon_vert,fragmentShader:n0.meshtoon_frag},matcap:{uniforms:SJ([D0.common,D0.bumpmap,D0.normalmap,D0.displacementmap,D0.fog,{matcap:{value:null}}]),vertexShader:n0.meshmatcap_vert,fragmentShader:n0.meshmatcap_frag},points:{uniforms:SJ([D0.points,D0.fog]),vertexShader:n0.points_vert,fragmentShader:n0.points_frag},dashed:{uniforms:SJ([D0.common,D0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:n0.linedashed_vert,fragmentShader:n0.linedashed_frag},depth:{uniforms:SJ([D0.common,D0.displacementmap]),vertexShader:n0.depth_vert,fragmentShader:n0.depth_frag},normal:{uniforms:SJ([D0.common,D0.bumpmap,D0.normalmap,D0.displacementmap,{opacity:{value:1}}]),vertexShader:n0.meshnormal_vert,fragmentShader:n0.meshnormal_frag},sprite:{uniforms:SJ([D0.sprite,D0.fog]),vertexShader:n0.sprite_vert,fragmentShader:n0.sprite_frag},background:{uniforms:{uvTransform:{value:new g0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:n0.background_vert,fragmentShader:n0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new g0}},vertexShader:n0.backgroundCube_vert,fragmentShader:n0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:n0.cube_vert,fragmentShader:n0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:n0.equirect_vert,fragmentShader:n0.equirect_frag},distance:{uniforms:SJ([D0.common,D0.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:n0.distance_vert,fragmentShader:n0.distance_frag},shadow:{uniforms:SJ([D0.lights,D0.fog,{color:{value:new m0(0)},opacity:{value:1}}]),vertexShader:n0.shadow_vert,fragmentShader:n0.shadow_frag}};N9.physical={uniforms:SJ([N9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new g0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new g0},clearcoatNormalScale:{value:new Y0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new g0},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new g0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new g0},sheen:{value:0},sheenColor:{value:new m0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new g0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new g0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new g0},transmissionSamplerSize:{value:new Y0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new g0},attenuationDistance:{value:0},attenuationColor:{value:new m0(0)},specularColor:{value:new m0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new g0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new g0},anisotropyVector:{value:new Y0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new g0}}]),vertexShader:n0.meshphysical_vert,fragmentShader:n0.meshphysical_frag};var j6={r:0,b:0,g:0},LG=new JJ,oK=new g0;oK.set(-1,0,0,0,1,0,0,0,1);function VG(J,Q,$,W,Z,K){let H=new m0(0),Y=Z===!0?0:1,X,U,N=null,E=0,G=null;function D(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){let L=A.backgroundBlurriness>0;C=Q.get(C,L)}return C}function R(A){let C=!1,L=D(A);if(L===null)F(H,Y);else if(L&&L.isColor)F(L,1),C=!0;let z=J.xr.getEnvironmentBlendMode();if(z==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(z==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||C)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function B(A,C){let L=D(C);if(L&&(L.isCubeTexture||L.mapping===K7)){if(U===void 0)U=new kJ(new v9(1,1,1),new uJ({name:"BackgroundCubeMaterial",uniforms:o9(N9.backgroundCube.uniforms),vertexShader:N9.backgroundCube.vertexShader,fragmentShader:N9.backgroundCube.fragmentShader,side:TJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(z,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(U.material.uniforms.envMap.value=L,U.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(LG.makeRotationFromEuler(C.backgroundRotation)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(oK);if(U.material.toneMapped=r0.getTransfer(L.colorSpace)!==NJ,N!==L||E!==L.version||G!==J.toneMapping)U.material.needsUpdate=!0,N=L,E=L.version,G=J.toneMapping;U.layers.enableAll(),A.unshift(U,U.geometry,U.material,0,0,null)}else if(L&&L.isTexture){if(X===void 0)X=new kJ(new F7(2,2),new uJ({name:"BackgroundMaterial",uniforms:o9(N9.background.uniforms),vertexShader:N9.background.vertexShader,fragmentShader:N9.background.fragmentShader,side:C8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(X);if(X.material.uniforms.t2D.value=L,X.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,X.material.toneMapped=r0.getTransfer(L.colorSpace)!==NJ,L.matrixAutoUpdate===!0)L.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(L.matrix),N!==L||E!==L.version||G!==J.toneMapping)X.material.needsUpdate=!0,N=L,E=L.version,G=J.toneMapping;X.layers.enableAll(),A.unshift(X,X.geometry,X.material,0,0,null)}}function F(A,C){A.getRGB(j6,y$(J)),$.buffers.color.setClear(j6.r,j6.g,j6.b,C,K)}function q(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(A,C=1){H.set(A),Y=C,F(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(A){Y=A,F(H,Y)},render:R,addToRenderList:B,dispose:q}}function BG(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),W={},Z=G(null),K=Z,H=!1;function Y(v,h,i,T,p){let o=!1,m=E(v,T,i,h);if(K!==m)K=m,U(K.object);if(o=D(v,T,i,p),o)R(v,T,i,p);if(p!==null)Q.update(p,J.ELEMENT_ARRAY_BUFFER);if(o||H){if(H=!1,L(v,h,i,T),p!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(p).buffer)}}function X(){return J.createVertexArray()}function U(v){return J.bindVertexArray(v)}function N(v){return J.deleteVertexArray(v)}function E(v,h,i,T){let p=T.wireframe===!0,o=W[h.id];if(o===void 0)o={},W[h.id]=o;let m=v.isInstancedMesh===!0?v.id:0,Z0=o[m];if(Z0===void 0)Z0={},o[m]=Z0;let u=Z0[i.id];if(u===void 0)u={},Z0[i.id]=u;let r=u[p];if(r===void 0)r=G(X()),u[p]=r;return r}function G(v){let h=[],i=[],T=[];for(let p=0;p<$;p++)h[p]=0,i[p]=0,T[p]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:h,enabledAttributes:i,attributeDivisors:T,object:v,attributes:{},index:null}}function D(v,h,i,T){let p=K.attributes,o=h.attributes,m=0,Z0=i.getAttributes();for(let u in Z0)if(Z0[u].location>=0){let Q0=p[u],T0=o[u];if(T0===void 0){if(u==="instanceMatrix"&&v.instanceMatrix)T0=v.instanceMatrix;if(u==="instanceColor"&&v.instanceColor)T0=v.instanceColor}if(Q0===void 0)return!0;if(Q0.attribute!==T0)return!0;if(T0&&Q0.data!==T0.data)return!0;m++}if(K.attributesNum!==m)return!0;if(K.index!==T)return!0;return!1}function R(v,h,i,T){let p={},o=h.attributes,m=0,Z0=i.getAttributes();for(let u in Z0)if(Z0[u].location>=0){let Q0=o[u];if(Q0===void 0){if(u==="instanceMatrix"&&v.instanceMatrix)Q0=v.instanceMatrix;if(u==="instanceColor"&&v.instanceColor)Q0=v.instanceColor}let T0={};if(T0.attribute=Q0,Q0&&Q0.data)T0.data=Q0.data;p[u]=T0,m++}K.attributes=p,K.attributesNum=m,K.index=T}function B(){let v=K.newAttributes;for(let h=0,i=v.length;h<i;h++)v[h]=0}function F(v){q(v,0)}function q(v,h){let{newAttributes:i,enabledAttributes:T,attributeDivisors:p}=K;if(i[v]=1,T[v]===0)J.enableVertexAttribArray(v),T[v]=1;if(p[v]!==h)J.vertexAttribDivisor(v,h),p[v]=h}function A(){let{newAttributes:v,enabledAttributes:h}=K;for(let i=0,T=h.length;i<T;i++)if(h[i]!==v[i])J.disableVertexAttribArray(i),h[i]=0}function C(v,h,i,T,p,o,m){if(m===!0)J.vertexAttribIPointer(v,h,i,p,o);else J.vertexAttribPointer(v,h,i,T,p,o)}function L(v,h,i,T){B();let p=T.attributes,o=i.getAttributes(),m=h.defaultAttributeValues;for(let Z0 in o){let u=o[Z0];if(u.location>=0){let r=p[Z0];if(r===void 0){if(Z0==="instanceMatrix"&&v.instanceMatrix)r=v.instanceMatrix;if(Z0==="instanceColor"&&v.instanceColor)r=v.instanceColor}if(r!==void 0){let{normalized:Q0,itemSize:T0}=r,S0=Q.get(r);if(S0===void 0)continue;let{buffer:ZJ,type:u0,bytesPerElement:n}=S0,H0=u0===J.INT||u0===J.UNSIGNED_INT||r.gpuType===AQ;if(r.isInterleavedBufferAttribute){let W0=r.data,j0=W0.stride,h0=r.offset;if(W0.isInstancedInterleavedBuffer){for(let z0=0;z0<u.locationSize;z0++)q(u.location+z0,W0.meshPerAttribute);if(v.isInstancedMesh!==!0&&T._maxInstanceCount===void 0)T._maxInstanceCount=W0.meshPerAttribute*W0.count}else for(let z0=0;z0<u.locationSize;z0++)F(u.location+z0);J.bindBuffer(J.ARRAY_BUFFER,ZJ);for(let z0=0;z0<u.locationSize;z0++)C(u.location+z0,T0/u.locationSize,u0,Q0,j0*n,(h0+T0/u.locationSize*z0)*n,H0)}else{if(r.isInstancedBufferAttribute){for(let W0=0;W0<u.locationSize;W0++)q(u.location+W0,r.meshPerAttribute);if(v.isInstancedMesh!==!0&&T._maxInstanceCount===void 0)T._maxInstanceCount=r.meshPerAttribute*r.count}else for(let W0=0;W0<u.locationSize;W0++)F(u.location+W0);J.bindBuffer(J.ARRAY_BUFFER,ZJ);for(let W0=0;W0<u.locationSize;W0++)C(u.location+W0,T0/u.locationSize,u0,Q0,T0*n,T0/u.locationSize*W0*n,H0)}}else if(m!==void 0){let Q0=m[Z0];if(Q0!==void 0)switch(Q0.length){case 2:J.vertexAttrib2fv(u.location,Q0);break;case 3:J.vertexAttrib3fv(u.location,Q0);break;case 4:J.vertexAttrib4fv(u.location,Q0);break;default:J.vertexAttrib1fv(u.location,Q0)}}}}A()}function z(){I();for(let v in W){let h=W[v];for(let i in h){let T=h[i];for(let p in T){let o=T[p];for(let m in o)N(o[m].object),delete o[m];delete T[p]}}delete W[v]}}function w(v){if(W[v.id]===void 0)return;let h=W[v.id];for(let i in h){let T=h[i];for(let p in T){let o=T[p];for(let m in o)N(o[m].object),delete o[m];delete T[p]}}delete W[v.id]}function _(v){for(let h in W){let i=W[h];for(let T in i){let p=i[T];if(p[v.id]===void 0)continue;let o=p[v.id];for(let m in o)N(o[m].object),delete o[m];delete p[v.id]}}}function M(v){for(let h in W){let i=W[h],T=v.isInstancedMesh===!0?v.id:0,p=i[T];if(p===void 0)continue;for(let o in p){let m=p[o];for(let Z0 in m)N(m[Z0].object),delete m[Z0];delete p[o]}if(delete i[T],Object.keys(i).length===0)delete W[h]}}function I(){if(g(),H=!0,K===Z)return;K=Z,U(K.object)}function g(){Z.geometry=null,Z.program=null,Z.wireframe=!1}return{setup:Y,reset:I,resetDefaultState:g,dispose:z,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:_,initAttributes:B,enableAttribute:F,disableUnusedAttributes:A}}function IG(J,Q,$){let W;function Z(X){W=X}function K(X,U){J.drawArrays(W,X,U),$.update(U,W,1)}function H(X,U,N){if(N===0)return;J.drawArraysInstanced(W,X,U,N),$.update(U,W,N)}function Y(X,U,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(W,X,0,U,0,N);let G=0;for(let D=0;D<N;D++)G+=U[D];$.update(G,W,1)}this.setMode=Z,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function zG(J,Q,$,W){let Z;function K(){if(Z!==void 0)return Z;if(Q.has("EXT_texture_filter_anisotropic")===!0){let _=Q.get("EXT_texture_filter_anisotropic");Z=J.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function H(_){if(_!==U9&&W.convert(_)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(_){let M=_===X9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(_!==rJ&&_!==k9&&!M&&W.convert(_)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function X(_){if(_==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";_="mediump"}if(_==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",N=X(U);if(N!==U)f0("WebGLRenderer:",U,"not supported, using",N,"instead."),U=N;let E=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)f0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),B=J.getParameter(J.MAX_TEXTURE_SIZE),F=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),q=J.getParameter(J.MAX_VERTEX_ATTRIBS),A=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),L=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),z=J.getParameter(J.MAX_SAMPLES),w=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:E,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:R,maxTextureSize:B,maxCubemapSize:F,maxAttributes:q,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:L,maxSamples:z,samples:w}}function AG(J){let Q=this,$=null,W=0,Z=!1,K=!1,H=new $9,Y=new g0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(E,G){let D=E.length!==0||G||W!==0||Z;return Z=G,W=E.length,D},this.beginShadows=function(){K=!0,N(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(E,G){$=N(E,G,0)},this.setState=function(E,G,D){let{clippingPlanes:R,clipIntersection:B,clipShadows:F}=E,q=J.get(E);if(!Z||R===null||R.length===0||K&&!F)if(K)N(null);else U();else{let A=K?0:W,C=A*4,L=q.clippingState||null;X.value=L,L=N(R,G,C,D);for(let z=0;z!==C;++z)L[z]=$[z];q.clippingState=L,this.numIntersection=B?this.numPlanes:0,this.numPlanes+=A}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=W>0;Q.numPlanes=W,Q.numIntersection=0}function N(E,G,D,R){let B=E!==null?E.length:0,F=null;if(B!==0){if(F=X.value,R!==!0||F===null){let q=D+B*4,A=G.matrixWorldInverse;if(Y.getNormalMatrix(A),F===null||F.length<q)F=new Float32Array(q);for(let C=0,L=D;C!==B;++C,L+=4)H.copy(E[C]).applyMatrix4(A,Y),H.normal.toArray(F,L),F[L+3]=H.constant}X.value=F,X.needsUpdate=!0}return Q.numPlanes=B,Q.numIntersection=0,F}}var y8=4,CG=6,wG=20,_G=256,O7=new D7,wK=new m0,e$=null,JW=0,QW=0,$W=!1,PG=new S,e9=new S;class KW{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,W=100,Z={}){let{size:K=256,position:H=PG}=Z;e$=this._renderer.getRenderTarget(),JW=this._renderer.getActiveCubeFace(),QW=this._renderer.getActiveMipmapLevel(),$W=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,W,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=TK(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=PK(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(e$,JW,QW),this._renderer.xr.enabled=$W,J.scissorTest=!1,j8(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===_8||J.mapping===d9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);e$=this._renderer.getRenderTarget(),JW=this._renderer.getActiveCubeFace(),QW=this._renderer.getActiveMipmapLevel(),$W=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:fJ,minFilter:fJ,generateMipmaps:!1,type:X9,format:U9,colorSpace:X$,depthBuffer:!1},W=_K(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=_K(J,Q,$);let{_lodMax:Z}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=TG(Z)),this._blurMaterial=jG(Z,J,Q),this._ggxMaterial=SG(Z,J,Q)}return W}_compileMaterial(J){let Q=new kJ(new AJ,J);this._renderer.compile(Q,O7)}_sceneToCubeUV(J,Q,$,W,Z){let Y=new vJ(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],N=this._renderer,E=N.autoClear,G=N.toneMapping;if(N.getClearColor(wK),N.toneMapping=aJ,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(W),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new kJ(new v9,new O6({name:"PMREM.Background",side:TJ,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,B=R.material,F=!1,q=J.background;if(q){if(q.isColor)B.color.copy(q),J.background=null,F=!0}else B.color.copy(wK),F=!0;for(let A=0;A<6;A++){let C=A%3;if(C===0)Y.up.set(0,X[A],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x+U[A],Z.y,Z.z);else if(C===1)Y.up.set(0,0,X[A]),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y+U[A],Z.z);else Y.up.set(0,X[A],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y,Z.z+U[A]);let L=this._cubeSize;if(j8(W,C*L,A>2?L:0,L,L),N.setRenderTarget(W),F)N.render(R,Y);N.render(J,Y)}N.toneMapping=G,N.autoClear=E,J.background=q}_textureToCubeUV(J,Q){let $=this._renderer,W=J.mapping===_8||J.mapping===d9;if(W){if(this._cubemapMaterial===null)this._cubemapMaterial=TK();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=PK();let Z=W?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=Z;let H=Z.uniforms;H.envMap.value=J;let Y=this._cubeSize;j8(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,O7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let W=this._lodMeshes.length;for(let Z=1;Z<W;Z++)this._applyGGXFilter(J,Z-1,Z);Q.autoClear=$}_applyGGXFilter(J,Q,$){let W=this._renderer,Z=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),N=Math.sqrt(X*X-U*U),E=X*1.25,G=N*E,{_lodMax:D}=this,R=this._sizeLods[$],B=3*R*($>D-y8?$-D+y8:0),F=4*(this._cubeSize-R);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-Q,j8(Z,B,F,3*R,2*R),W.setRenderTarget(Z),W.render(H,O7),Y.envMap.value=Z.texture,Y.roughness.value=0,Y.mipInt.value=D-$,j8(J,B,F,3*R,2*R),W.setRenderTarget(J),W.render(H,O7)}_blur(J,Q,$,W){let Z=this._pingPongRenderTarget,K=Math.min(W,Math.PI)/Math.SQRT2;this._blurPass(J,Z,Q,$,K),this._blurPass(Z,J,$,$,K)}_blurPass(J,Q,$,W,Z){let K=this._renderer,H=this._blurMaterial,Y=this._lodMeshes[W];Y.material=H;let X=H.uniforms;X.envMap.value=J.texture,X.sigma.value=Z,X.mipInt.value=this._lodMax-$;let U=this._sizeLods[W],N=3*U*(W>this._lodMax-y8?W-this._lodMax+y8:0),E=4*(this._cubeSize-U);j8(Q,N,E,3*U,2*U),K.setRenderTarget(Q),K.render(Y,O7)}}function TG(J){let Q=[],$=[],W=J,Z=J-y8+1+CG;for(let K=0;K<Z;K++){let H=Math.pow(2,W);Q.push(H);let Y=1/(H-2),X=-Y,U=1+Y,N=[X,X,U,X,U,U,X,X,U,U,X,U],E=6,G=6,D=3,R=new Float32Array(D*G*E),B=new Float32Array(D*G*E);for(let q=0;q<E;q++){let A=q%3*2/3-1,C=q>2?0:-1,L=[A,C,0,A+0.6666666666666666,C,0,A+0.6666666666666666,C+1,0,A,C,0,A+0.6666666666666666,C+1,0,A,C+1,0];R.set(L,D*G*q);for(let z=0;z<G;z++){let w=N[z*2]*2-1,_=N[z*2+1]*2-1;if(q===0)e9.set(1,_,w);else if(q===1)e9.set(-w,1,-_);else if(q===2)e9.set(-w,_,1);else if(q===3)e9.set(-1,_,-w);else if(q===4)e9.set(-w,-1,_);else e9.set(w,_,-1);e9.toArray(B,(q*G+z)*D)}}let F=new AJ;if(F.setAttribute("position",new gJ(R,D)),F.setAttribute("outputDirection",new gJ(B,D)),$.push(new kJ(F,null)),W>y8)W--}return{lodMeshes:$,sizeLods:Q}}function _K(J,Q,$){let W=new pJ(J,Q,$);return W.texture.mapping=K7,W.texture.name="PMREM.cubeUv",W.scissorTest=!0,W}function j8(J,Q,$,W,Z){J.viewport.set(Q,$,W,Z),J.scissor.set(Q,$,W,Z)}function SG(J,Q,$){return new uJ({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_G,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:v6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Y9,depthTest:!1,depthWrite:!1})}function jG(J,Q,$){return new uJ({name:"SphericalGaussianBlur",defines:{SAMPLES:wG,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:v6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Y9,depthTest:!1,depthWrite:!1})}function PK(){return new uJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:v6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Y9,depthTest:!1,depthWrite:!1})}function TK(){return new uJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:v6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Y9,depthTest:!1,depthWrite:!1})}function v6(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class XW extends pJ{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},W=[$,$,$,$,$,$];this.texture=new k6(W),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},W=new v9(5,5,5),Z=new uJ({name:"CubemapFromEquirect",uniforms:o9($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:TJ,blending:Y9});Z.uniforms.tEquirect.value=Q;let K=new kJ(W,Z),H=Q.minFilter;if(Q.minFilter===l9)Q.minFilter=fJ;return new s$(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,W=!0){let Z=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,W);J.setRenderTarget(Z)}}function yG(J){let Q=new WeakMap,$=new WeakMap,W=null;function Z(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let D=G.mapping;if(D===J6||D===Q6)if(Q.has(G)){let R=Q.get(G).texture;return Y(R,G.mapping)}else{let R=G.image;if(R&&R.height>0){let B=new XW(R.height);return B.fromEquirectangularTexture(J,G),Q.set(G,B),G.addEventListener("dispose",U),Y(B.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,R=D===J6||D===Q6,B=D===_8||D===d9;if(R||B){let F=$.get(G),q=F!==void 0?F.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==q){if(W===null)W=new KW(J);return F=R?W.fromEquirectangular(G,F):W.fromCubemap(G,F),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),F.texture}else if(F!==void 0)return F.texture;else{let A=G.image;if(R&&A&&A.height>0||B&&A&&X(A)){if(W===null)W=new KW(J);return F=R?W.fromEquirectangular(G):W.fromCubemap(G),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),G.addEventListener("dispose",N),F.texture}else return null}}}return G}function Y(G,D){if(D===J6)G.mapping=_8;else if(D===Q6)G.mapping=d9;return G}function X(G){let D=0,R=6;for(let B=0;B<R;B++)if(G[B]!==void 0)D++;return D===R}function U(G){let D=G.target;D.removeEventListener("dispose",U);let R=Q.get(D);if(R!==void 0)Q.delete(D),R.dispose()}function N(G){let D=G.target;D.removeEventListener("dispose",N);let R=$.get(D);if(R!==void 0)$.delete(D),R.dispose()}function E(){if(Q=new WeakMap,$=new WeakMap,W!==null)W.dispose(),W=null}return{get:Z,dispose:E}}function vG(J){let Q={};function $(W){if(Q[W]!==void 0)return Q[W];let Z=J.getExtension(W);return Q[W]=Z,Z}return{has:function(W){return $(W)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(W){let Z=$(W);if(Z===null)p9("WebGLRenderer: "+W+" extension not supported.");return Z}}}function fG(J,Q,$,W){let Z={},K=new WeakMap;function H(E){let G=E.target;if(G.index!==null)Q.remove(G.index);for(let R in G.attributes)Q.remove(G.attributes[R]);G.removeEventListener("dispose",H),delete Z[G.id];let D=K.get(G);if(D)Q.remove(D),K.delete(G);if(W.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(E,G){if(Z[G.id]===!0)return G;return G.addEventListener("dispose",H),Z[G.id]=!0,$.memory.geometries++,G}function X(E){let G=E.attributes;for(let D in G)Q.update(G[D],J.ARRAY_BUFFER)}function U(E){let G=[],D=E.index,R=E.attributes.position,B=0;if(R===void 0)return;if(D!==null){let A=D.array;B=D.version;for(let C=0,L=A.length;C<L;C+=3){let z=A[C+0],w=A[C+1],_=A[C+2];G.push(z,w,w,_,_,z)}}else{let A=R.array;B=R.version;for(let C=0,L=A.length/3-1;C<L;C+=3){let z=C+0,w=C+1,_=C+2;G.push(z,w,w,_,_,z)}}let F=new(R.count>=65535?D6:F6)(G,1);F.version=B;let q=K.get(E);if(q)Q.remove(q);K.set(E,F)}function N(E){let G=K.get(E);if(G){let D=E.index;if(D!==null){if(G.version<D.version)U(E)}}else U(E);return K.get(E)}return{get:Y,update:X,getWireframeAttribute:N}}function hG(J,Q,$){let W;function Z(E){W=E}let K,H;function Y(E){K=E.type,H=E.bytesPerElement}function X(E,G){J.drawElements(W,G,K,E*H),$.update(G,W,1)}function U(E,G,D){if(D===0)return;J.drawElementsInstanced(W,G,K,E*H,D),$.update(G,W,D)}function N(E,G,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(W,G,0,K,E,0,D);let B=0;for(let F=0;F<D;F++)B+=G[F];$.update(B,W,1)}this.setMode=Z,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=N}function bG(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function W(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:x0("WebGLInfo: Unknown draw mode:",H);break}}function Z(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:Z,update:W}}function xG(J,Q,$){let W=new WeakMap,Z=new DJ;function K(H,Y,X){let U=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,E=N!==void 0?N.length:0,G=W.get(Y);if(G===void 0||G.count!==E){let I=function(){_.dispose(),W.delete(Y),Y.removeEventListener("dispose",I)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,R=Y.morphAttributes.normal!==void 0,B=Y.morphAttributes.color!==void 0,F=Y.morphAttributes.position||[],q=Y.morphAttributes.normal||[],A=Y.morphAttributes.color||[],C=0;if(D===!0)C=1;if(R===!0)C=2;if(B===!0)C=3;let L=Y.attributes.position.count*C,z=1;if(L>Q.maxTextureSize)z=Math.ceil(L/Q.maxTextureSize),L=Q.maxTextureSize;let w=new Float32Array(L*z*4*E),_=new E6(w,L,z,E);_.type=k9,_.needsUpdate=!0;let M=C*4;for(let g=0;g<E;g++){let v=F[g],h=q[g],i=A[g],T=L*z*4*g;for(let p=0;p<v.count;p++){let o=p*M;if(D===!0)Z.fromBufferAttribute(v,p),w[T+o+0]=Z.x,w[T+o+1]=Z.y,w[T+o+2]=Z.z,w[T+o+3]=0;if(R===!0)Z.fromBufferAttribute(h,p),w[T+o+4]=Z.x,w[T+o+5]=Z.y,w[T+o+6]=Z.z,w[T+o+7]=0;if(B===!0)Z.fromBufferAttribute(i,p),w[T+o+8]=Z.x,w[T+o+9]=Z.y,w[T+o+10]=Z.z,w[T+o+11]=i.itemSize===4?Z.w:1}}G={count:E,texture:_,size:new Y0(L,z)},W.set(Y,G),Y.addEventListener("dispose",I)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let D=0;for(let B=0;B<U.length;B++)D+=U[B];let R=Y.morphTargetsRelative?1:1-D;X.getUniforms().setValue(J,"morphTargetBaseInfluence",R),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function gG(J,Q,$,W,Z){let K=new WeakMap;function H(U){let N=Z.render.frame,E=U.geometry,G=Q.get(U,E);if(K.get(G)!==N)Q.update(G),K.set(G,N);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==N){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,N)}}if(U.isSkinnedMesh){let D=U.skeleton;if(K.get(D)!==N)D.update(),K.set(D,N)}return G}function Y(){K=new WeakMap}function X(U){let N=U.target;if(N.removeEventListener("dispose",X),W.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:H,dispose:Y}}var pG={[MQ]:"LINEAR_TONE_MAPPING",[kQ]:"REINHARD_TONE_MAPPING",[LQ]:"CINEON_TONE_MAPPING",[VQ]:"ACES_FILMIC_TONE_MAPPING",[IQ]:"AGX_TONE_MAPPING",[zQ]:"NEUTRAL_TONE_MAPPING",[BQ]:"CUSTOM_TONE_MAPPING"};function mG(J,Q,$,W,Z,K){let H=new pJ(Q,$,{type:J,depthBuffer:Z,stencilBuffer:K,samples:W?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Y=null,X=null,U=new AJ;U.setAttribute("position",new WJ([-1,3,0,-1,-1,0,3,-1,0],3)),U.setAttribute("uv",new WJ([0,2,0,0,2,0],2));let N=new v$({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),E=new kJ(U,N),G=new D7(-1,1,1,-1,0,1),D=null,R=null,B=!1,F,q=null,A=[],C=!1;this.setSize=function(L,z){if(H.setSize(L,z),Y!==null)Y.setSize(L,z);if(X!==null)X.setSize(L,z);for(let w=0;w<A.length;w++){let _=A[w];if(_.setSize)_.setSize(L,z)}},this.setEffects=function(L){A=L,C=A.length>0&&A[0].isRenderPass===!0;let{width:z,height:w}=H;if(A.length>0&&Y===null)Y=new pJ(z,w,{type:X9,depthBuffer:!1,stencilBuffer:!1}),X=new pJ(z,w,{type:X9,depthBuffer:!1,stencilBuffer:!1});for(let _=0;_<A.length;_++){let M=A[_];if(M.setSize)M.setSize(z,w)}},this.begin=function(L,z){if(B)return!1;if(L.toneMapping===aJ&&A.length===0)return!1;if(q=z,z!==null){let{width:w,height:_}=z;if(H.width!==w||H.height!==_)this.setSize(w,_)}if(C===!1)L.setRenderTarget(H);return F=L.toneMapping,L.toneMapping=aJ,!0},this.hasRenderPass=function(){return C},this.end=function(L,z){L.toneMapping=F,B=!0;let w=H,_=Y;for(let M=0;M<A.length;M++){let I=A[M];if(I.enabled===!1)continue;if(I.render(L,_,w,z),I.needsSwap!==!1)w=_,_=_===Y?X:Y}if(D!==L.outputColorSpace||R!==L.toneMapping){if(D=L.outputColorSpace,R=L.toneMapping,N.defines={},r0.getTransfer(D)===NJ)N.defines.SRGB_TRANSFER="";let M=pG[R];if(M)N.defines[M]="";N.needsUpdate=!0}N.uniforms.tDiffuse.value=w.texture,L.setRenderTarget(q),L.render(E,G),q=null,B=!1},this.isCompositing=function(){return B},this.dispose=function(){if(H.dispose(),Y!==null)Y.dispose();if(X!==null)X.dispose();U.dispose(),N.dispose()}}var aK=new CJ,HW=new i9(1,1),rK=new E6,tK=new D$,eK=new k6,SK=[],jK=[],yK=new Float32Array(16),vK=new Float32Array(9),fK=new Float32Array(4);function v8(J,Q,$){let W=J[0];if(W<=0||W>0)return J;let Z=Q*$,K=SK[Z];if(K===void 0)K=new Float32Array(Z),SK[Z]=K;if(Q!==0){W.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function BJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,W=J.length;$<W;$++)if(J[$]!==Q[$])return!1;return!0}function IJ(J,Q){for(let $=0,W=Q.length;$<W;$++)J[$]=Q[$]}function f6(J,Q){let $=jK[Q];if($===void 0)$=new Int32Array(Q),jK[Q]=$;for(let W=0;W!==Q;++W)$[W]=J.allocateTextureUnit();return $}function dG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function lG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(BJ($,Q))return;J.uniform2fv(this.addr,Q),IJ($,Q)}}function uG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(BJ($,Q))return;J.uniform3fv(this.addr,Q),IJ($,Q)}}function cG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(BJ($,Q))return;J.uniform4fv(this.addr,Q),IJ($,Q)}}function nG(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(BJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),IJ($,Q)}else{if(BJ($,W))return;fK.set(W),J.uniformMatrix2fv(this.addr,!1,fK),IJ($,W)}}function sG(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(BJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),IJ($,Q)}else{if(BJ($,W))return;vK.set(W),J.uniformMatrix3fv(this.addr,!1,vK),IJ($,W)}}function iG(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(BJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),IJ($,Q)}else{if(BJ($,W))return;yK.set(W),J.uniformMatrix4fv(this.addr,!1,yK),IJ($,W)}}function oG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function aG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(BJ($,Q))return;J.uniform2iv(this.addr,Q),IJ($,Q)}}function rG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(BJ($,Q))return;J.uniform3iv(this.addr,Q),IJ($,Q)}}function tG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(BJ($,Q))return;J.uniform4iv(this.addr,Q),IJ($,Q)}}function eG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function JN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(BJ($,Q))return;J.uniform2uiv(this.addr,Q),IJ($,Q)}}function QN(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(BJ($,Q))return;J.uniform3uiv(this.addr,Q),IJ($,Q)}}function $N(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(BJ($,Q))return;J.uniform4uiv(this.addr,Q),IJ($,Q)}}function WN(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;let K;if(this.type===J.SAMPLER_2D_SHADOW)HW.compareFunction=$.isReversedDepthBuffer()?N6:G6,K=HW;else K=aK;$.setTexture2D(Q||K,Z)}function ZN(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture3D(Q||tK,Z)}function KN(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTextureCube(Q||eK,Z)}function HN(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture2DArray(Q||rK,Z)}function YN(J){switch(J){case 5126:return dG;case 35664:return lG;case 35665:return uG;case 35666:return cG;case 35674:return nG;case 35675:return sG;case 35676:return iG;case 5124:case 35670:return oG;case 35667:case 35671:return aG;case 35668:case 35672:return rG;case 35669:case 35673:return tG;case 5125:return eG;case 36294:return JN;case 36295:return QN;case 36296:return $N;case 35678:case 36198:case 36298:case 36306:case 35682:return WN;case 35679:case 36299:case 36307:return ZN;case 35680:case 36300:case 36308:case 36293:return KN;case 36289:case 36303:case 36311:case 36292:return HN}}function XN(J,Q){J.uniform1fv(this.addr,Q)}function UN(J,Q){let $=v8(Q,this.size,2);J.uniform2fv(this.addr,$)}function GN(J,Q){let $=v8(Q,this.size,3);J.uniform3fv(this.addr,$)}function NN(J,Q){let $=v8(Q,this.size,4);J.uniform4fv(this.addr,$)}function EN(J,Q){let $=v8(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function qN(J,Q){let $=v8(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function FN(J,Q){let $=v8(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function DN(J,Q){J.uniform1iv(this.addr,Q)}function ON(J,Q){J.uniform2iv(this.addr,Q)}function RN(J,Q){J.uniform3iv(this.addr,Q)}function MN(J,Q){J.uniform4iv(this.addr,Q)}function kN(J,Q){J.uniform1uiv(this.addr,Q)}function LN(J,Q){J.uniform2uiv(this.addr,Q)}function VN(J,Q){J.uniform3uiv(this.addr,Q)}function BN(J,Q){J.uniform4uiv(this.addr,Q)}function IN(J,Q,$){let W=this.cache,Z=Q.length,K=f6($,Z);if(!BJ(W,K))J.uniform1iv(this.addr,K),IJ(W,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=HW;else H=aK;for(let Y=0;Y!==Z;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function zN(J,Q,$){let W=this.cache,Z=Q.length,K=f6($,Z);if(!BJ(W,K))J.uniform1iv(this.addr,K),IJ(W,K);for(let H=0;H!==Z;++H)$.setTexture3D(Q[H]||tK,K[H])}function AN(J,Q,$){let W=this.cache,Z=Q.length,K=f6($,Z);if(!BJ(W,K))J.uniform1iv(this.addr,K),IJ(W,K);for(let H=0;H!==Z;++H)$.setTextureCube(Q[H]||eK,K[H])}function CN(J,Q,$){let W=this.cache,Z=Q.length,K=f6($,Z);if(!BJ(W,K))J.uniform1iv(this.addr,K),IJ(W,K);for(let H=0;H!==Z;++H)$.setTexture2DArray(Q[H]||rK,K[H])}function wN(J){switch(J){case 5126:return XN;case 35664:return UN;case 35665:return GN;case 35666:return NN;case 35674:return EN;case 35675:return qN;case 35676:return FN;case 5124:case 35670:return DN;case 35667:case 35671:return ON;case 35668:case 35672:return RN;case 35669:case 35673:return MN;case 5125:return kN;case 36294:return LN;case 36295:return VN;case 36296:return BN;case 35678:case 36198:case 36298:case 36306:case 35682:return IN;case 35679:case 36299:case 36307:return zN;case 35680:case 36300:case 36308:case 36293:return AN;case 36289:case 36303:case 36311:case 36292:return CN}}class JH{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=YN(Q.type)}}class QH{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=wN(Q.type)}}class $H{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let W=this.seq;for(let Z=0,K=W.length;Z!==K;++Z){let H=W[Z];H.setValue(J,Q[H.id],$)}}}var WW=/(\w+)(\])?(\[|\.)?/g;function hK(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function _N(J,Q,$){let W=J.name,Z=W.length;WW.lastIndex=0;while(!0){let K=WW.exec(W),H=WW.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===Z){hK($,U===void 0?new JH(Y,J,Q):new QH(Y,J,Q));break}else{let E=$.map[Y];if(E===void 0)E=new $H(Y),hK($,E);$=E}}}class k7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);_N(H,Y,this)}let W=[],Z=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)W.push(K);else Z.push(K);if(W.length>0)this.seq=W.concat(Z)}setValue(J,Q,$,W){let Z=this.map[Q];if(Z!==void 0)Z.setValue(J,$,W)}setOptional(J,Q,$){let W=Q[$];if(W!==void 0)this.setValue(J,$,W)}static upload(J,Q,$,W){for(let Z=0,K=Q.length;Z!==K;++Z){let H=Q[Z],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,W)}}static seqWithValue(J,Q){let $=[];for(let W=0,Z=J.length;W!==Z;++W){let K=J[W];if(K.id in Q)$.push(K)}return $}}function bK(J,Q,$){let W=J.createShader(Q);return J.shaderSource(W,$),J.compileShader(W),W}var PN=37297,TN=0;function SN(J,Q){let $=J.split(`
`),W=[],Z=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=Z;H<K;H++){let Y=H+1;W.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return W.join(`
`)}var xK=new g0;function jN(J){r0._getMatrix(xK,r0.workingColorSpace,J);let Q=`mat3( ${xK.elements.map(($)=>$.toFixed(4))} )`;switch(r0.getTransfer(J)){case U$:return[Q,"LinearTransferOETF"];case NJ:return[Q,"sRGBTransferOETF"];default:return f0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function gK(J,Q,$){let W=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(W&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+SN(J.getShaderSource(Q),Y)}else return K}function yN(J,Q){let $=jN(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var vN={[MQ]:"Linear",[kQ]:"Reinhard",[LQ]:"Cineon",[VQ]:"ACESFilmic",[IQ]:"AgX",[zQ]:"Neutral",[BQ]:"Custom"};function fN(J,Q){let $=vN[Q];if($===void 0)return f0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var y6=new S;function hN(){r0.getLuminanceCoefficients(y6);let J=y6.x.toFixed(4),Q=y6.y.toFixed(4),$=y6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function bN(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(M7).join(`
`)}function xN(J){let Q=[];for(let $ in J){let W=J[$];if(W===!1)continue;Q.push("#define "+$+" "+W)}return Q.join(`
`)}function gN(J,Q){let $={},W=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let Z=0;Z<W;Z++){let K=J.getActiveAttrib(Q,Z),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function M7(J){return J!==""}function pK(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function mK(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var pN=/^[ \t]*#include +<([\w\d./]+)>/gm;function YW(J){return J.replace(pN,dN)}var mN=new Map;function dN(J,Q){let $=n0[Q];if($===void 0){let W=mN.get(Q);if(W!==void 0)$=n0[W],f0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,W);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return YW($)}var lN=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dK(J){return J.replace(lN,uN)}function uN(J,Q,$,W){let Z="";for(let K=parseInt(Q);K<parseInt($);K++)Z+=W.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return Z}function lK(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var cN={[W7]:"SHADOWMAP_TYPE_PCF",[A8]:"SHADOWMAP_TYPE_VSM"};function nN(J){return cN[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var sN={[_8]:"ENVMAP_TYPE_CUBE",[d9]:"ENVMAP_TYPE_CUBE",[K7]:"ENVMAP_TYPE_CUBE_UV"};function iN(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return sN[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var oN={[d9]:"ENVMAP_MODE_REFRACTION"};function aN(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return oN[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var rN={[vZ]:"ENVMAP_BLENDING_MULTIPLY",[fZ]:"ENVMAP_BLENDING_MIX",[hZ]:"ENVMAP_BLENDING_ADD"};function tN(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return rN[J.combine]||"ENVMAP_BLENDING_NONE"}function eN(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,W=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:W,maxMip:$}}function J5(J,Q,$,W){let Z=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=nN($),U=iN($),N=aN($),E=tN($),G=eN($),D=bN($),R=xN(K),B=Z.createProgram(),F,q,A=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(M7).join(`
`),F.length>0)F+=`
`;if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(M7).join(`
`),q.length>0)q+=`
`}else F=[lK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(M7).join(`
`),q=[lK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+N:"",$.envMap?"#define "+E:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.retroreflection?"#define USE_RETROREFLECTION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==aJ?"#define TONE_MAPPING":"",$.toneMapping!==aJ?n0.tonemapping_pars_fragment:"",$.toneMapping!==aJ?fN("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",n0.colorspace_pars_fragment,yN("linearToOutputTexel",$.outputColorSpace),hN(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(M7).join(`
`);if(H=YW(H),H=pK(H,$),H=mK(H,$),Y=YW(Y),Y=pK(Y,$),Y=mK(Y,$),H=dK(H),Y=dK(Y),$.isRawShaderMaterial!==!0)A=`#version 300 es
`,F=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,q=["#define varying in",$.glslVersion===G$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===G$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+q;let C=A+F+H,L=A+q+Y,z=bK(Z,Z.VERTEX_SHADER,C),w=bK(Z,Z.FRAGMENT_SHADER,L);if(Z.attachShader(B,z),Z.attachShader(B,w),$.index0AttributeName!==void 0)Z.bindAttribLocation(B,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)Z.bindAttribLocation(B,0,"position");Z.linkProgram(B);function _(v){if(J.debug.checkShaderErrors){let h=Z.getProgramInfoLog(B)||"",i=Z.getShaderInfoLog(z)||"",T=Z.getShaderInfoLog(w)||"",p=h.trim(),o=i.trim(),m=T.trim(),Z0=!0,u=!0;if(Z.getProgramParameter(B,Z.LINK_STATUS)===!1)if(Z0=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(Z,B,z,w);else{let r=gK(Z,z,"vertex"),Q0=gK(Z,w,"fragment");x0("WebGLProgram: Shader Error "+Z.getError()+" - VALIDATE_STATUS "+Z.getProgramParameter(B,Z.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+p+`
`+r+`
`+Q0)}else if(p!=="")f0("WebGLProgram: Program Info Log:",p);else if(o===""||m==="")u=!1;if(u)v.diagnostics={runnable:Z0,programLog:p,vertexShader:{log:o,prefix:F},fragmentShader:{log:m,prefix:q}}}Z.deleteShader(z),Z.deleteShader(w),M=new k7(Z,B),I=gN(Z,B)}let M;this.getUniforms=function(){if(M===void 0)_(this);return M};let I;this.getAttributes=function(){if(I===void 0)_(this);return I};let g=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(g===!1)g=Z.getProgramParameter(B,PN);return g},this.destroy=function(){W.releaseStatesOfProgram(this),Z.deleteProgram(B),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=TN++,this.cacheKey=Q,this.usedTimes=1,this.program=B,this.vertexShader=z,this.fragmentShader=w,this}var Q5=0;class WH{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let W=this._getShaderCacheForMaterial(J);if(W.has(Q)===!1)W.add(Q),Q.usedTimes++;if(W.has($)===!1)W.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new ZH(J),Q.set(J,$);return $}}class ZH{constructor(J){this.id=Q5++,this.code=J,this.usedTimes=0}}function $5(J){return J===n9||J===X6||J===U6}function W5(J,Q,$,W,Z,K){let H=new U7,Y=new WH,X=new Set,U=[],N=new Map,E=W.logarithmicDepthBuffer,G=W.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(M){if(X.add(M),M===0)return"uv";return`uv${M}`}function B(M,I,g,v,h,i){let T=v.fog,p=h.geometry,o=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?v.environment:null,m=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,Z0=Q.get(M.envMap||o,m),u=!!Z0&&Z0.mapping===K7?Z0.image.height:null,r=D[M.type];if(M.precision!==null){if(G=W.getMaxPrecision(M.precision),G!==M.precision)f0("WebGLProgram.getParameters:",M.precision,"not supported, using",G,"instead.")}let Q0=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,T0=Q0!==void 0?Q0.length:0,S0=0;if(p.morphAttributes.position!==void 0)S0=1;if(p.morphAttributes.normal!==void 0)S0=2;if(p.morphAttributes.color!==void 0)S0=3;let ZJ,u0,n,H0;if(r){let EJ=N9[r];ZJ=EJ.vertexShader,u0=EJ.fragmentShader}else{ZJ=M.vertexShader,u0=M.fragmentShader;let EJ=Y.getVertexShaderStage(M),QJ=Y.getFragmentShaderStage(M);Y.update(M,EJ,QJ),n=EJ.id,H0=QJ.id}let W0=J.getRenderTarget(),j0=J.state.buffers.depth.getReversed(),h0=h.isInstancedMesh===!0,z0=h.isBatchedMesh===!0,KJ=!!M.map,t=!!M.matcap,$0=!!Z0,K0=!!M.aoMap,X0=!!M.lightMap,M0=!!M.bumpMap&&M.wireframe===!1,_0=!!M.normalMap,y0=!!M.displacementMap,p0=!!M.emissiveMap,d0=!!M.metalnessMap,P=!!M.roughnessMap,XJ=M.anisotropy>0,i0=M.clearcoat>0,o0=M.dispersion>0,V=M.retroreflectivity>0,O=M.iridescence>0,j=M.sheen>0,d=M.transmission>0,e=XJ&&!!M.anisotropyMap,U0=i0&&!!M.clearcoatMap,N0=i0&&!!M.clearcoatNormalMap,c=i0&&!!M.clearcoatRoughnessMap,a=O&&!!M.iridescenceMap,L0=O&&!!M.iridescenceThicknessMap,P0=j&&!!M.sheenColorMap,F0=j&&!!M.sheenRoughnessMap,G0=!!M.specularMap,v0=!!M.specularColorMap,b0=!!M.specularIntensityMap,e0=d&&!!M.transmissionMap,f=d&&!!M.thicknessMap,E0=!!M.gradientMap,s=!!M.alphaMap,q0=M.alphaTest>0,V0=!!M.alphaHash,J0=!!M.extensions,O0=aJ;if(M.toneMapped){if(W0===null||W0.isXRRenderTarget===!0)O0=J.toneMapping}let l0={shaderID:r,shaderType:M.type,shaderName:M.name,vertexShader:ZJ,fragmentShader:u0,defines:M.defines,customVertexShaderID:n,customFragmentShaderID:H0,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:G,batching:z0,batchingColor:z0&&h._colorsTexture!==null,instancing:h0,instancingColor:h0&&h.instanceColor!==null,instancingMorph:h0&&h.morphTexture!==null,outputColorSpace:W0===null?J.outputColorSpace:W0.isXRRenderTarget===!0?W0.texture.colorSpace:r0.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:KJ,matcap:t,envMap:$0,envMapMode:$0&&Z0.mapping,envMapCubeUVHeight:u,aoMap:K0,lightMap:X0,bumpMap:M0,normalMap:_0,displacementMap:y0,emissiveMap:p0,normalMapObjectSpace:_0&&M.normalMapType===sZ,normalMapTangentSpace:_0&&M.normalMapType===Y$,packedNormalMap:_0&&M.normalMapType===Y$&&$5(M.normalMap.format),metalnessMap:d0,roughnessMap:P,anisotropy:XJ,anisotropyMap:e,clearcoat:i0,clearcoatMap:U0,clearcoatNormalMap:N0,clearcoatRoughnessMap:c,dispersion:o0,retroreflection:V,iridescence:O,iridescenceMap:a,iridescenceThicknessMap:L0,sheen:j,sheenColorMap:P0,sheenRoughnessMap:F0,specularMap:G0,specularColorMap:v0,specularIntensityMap:b0,transmission:d,transmissionMap:e0,thicknessMap:f,gradientMap:E0,opaque:M.transparent===!1&&M.blending===Z7&&M.alphaToCoverage===!1,alphaMap:s,alphaTest:q0,alphaHash:V0,combine:M.combine,mapUv:KJ&&R(M.map.channel),aoMapUv:K0&&R(M.aoMap.channel),lightMapUv:X0&&R(M.lightMap.channel),bumpMapUv:M0&&R(M.bumpMap.channel),normalMapUv:_0&&R(M.normalMap.channel),displacementMapUv:y0&&R(M.displacementMap.channel),emissiveMapUv:p0&&R(M.emissiveMap.channel),metalnessMapUv:d0&&R(M.metalnessMap.channel),roughnessMapUv:P&&R(M.roughnessMap.channel),anisotropyMapUv:e&&R(M.anisotropyMap.channel),clearcoatMapUv:U0&&R(M.clearcoatMap.channel),clearcoatNormalMapUv:N0&&R(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:c&&R(M.clearcoatRoughnessMap.channel),iridescenceMapUv:a&&R(M.iridescenceMap.channel),iridescenceThicknessMapUv:L0&&R(M.iridescenceThicknessMap.channel),sheenColorMapUv:P0&&R(M.sheenColorMap.channel),sheenRoughnessMapUv:F0&&R(M.sheenRoughnessMap.channel),specularMapUv:G0&&R(M.specularMap.channel),specularColorMapUv:v0&&R(M.specularColorMap.channel),specularIntensityMapUv:b0&&R(M.specularIntensityMap.channel),transmissionMapUv:e0&&R(M.transmissionMap.channel),thicknessMapUv:f&&R(M.thicknessMap.channel),alphaMapUv:s&&R(M.alphaMap.channel),vertexTangents:!!p.attributes.tangent&&(_0||XJ),vertexNormals:!!p.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!p.attributes.color&&p.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!p.attributes.uv&&(KJ||s),fog:!!T,useFog:M.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||p.attributes.normal===void 0&&_0===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:j0,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:p.attributes.position!==void 0,morphTargets:p.morphAttributes.position!==void 0,morphNormals:p.morphAttributes.normal!==void 0,morphColors:p.morphAttributes.color!==void 0,morphTargetsCount:T0,morphTextureStride:S0,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:i.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&g.length>0,shadowMapType:J.shadowMap.type,toneMapping:O0,decodeVideoTexture:KJ&&M.map.isVideoTexture===!0&&r0.getTransfer(M.map.colorSpace)===NJ,decodeVideoTextureEmissive:p0&&M.emissiveMap.isVideoTexture===!0&&r0.getTransfer(M.emissiveMap.colorSpace)===NJ,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===H9,flipSided:M.side===TJ,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:J0&&M.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(J0&&M.extensions.multiDraw===!0||z0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return l0.vertexUv1s=X.has(1),l0.vertexUv2s=X.has(2),l0.vertexUv3s=X.has(3),X.clear(),l0}function F(M){let I=[];if(M.shaderID)I.push(M.shaderID);else I.push(M.customVertexShaderID),I.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let g in M.defines)I.push(g),I.push(M.defines[g]);if(M.isRawShaderMaterial===!1)q(I,M),A(I,M),I.push(J.outputColorSpace);return I.push(M.customProgramCacheKey),I.join()}function q(M,I){M.push(I.precision),M.push(I.outputColorSpace),M.push(I.envMapMode),M.push(I.envMapCubeUVHeight),M.push(I.mapUv),M.push(I.alphaMapUv),M.push(I.lightMapUv),M.push(I.aoMapUv),M.push(I.bumpMapUv),M.push(I.normalMapUv),M.push(I.displacementMapUv),M.push(I.emissiveMapUv),M.push(I.metalnessMapUv),M.push(I.roughnessMapUv),M.push(I.anisotropyMapUv),M.push(I.clearcoatMapUv),M.push(I.clearcoatNormalMapUv),M.push(I.clearcoatRoughnessMapUv),M.push(I.iridescenceMapUv),M.push(I.iridescenceThicknessMapUv),M.push(I.sheenColorMapUv),M.push(I.sheenRoughnessMapUv),M.push(I.specularMapUv),M.push(I.specularColorMapUv),M.push(I.specularIntensityMapUv),M.push(I.transmissionMapUv),M.push(I.thicknessMapUv),M.push(I.combine),M.push(I.fogExp2),M.push(I.sizeAttenuation),M.push(I.morphTargetsCount),M.push(I.morphAttributeCount),M.push(I.numSunLights),M.push(I.numDirLights),M.push(I.numPointLights),M.push(I.numSpotLights),M.push(I.numSpotLightMaps),M.push(I.numHemiLights),M.push(I.numRectAreaLights),M.push(I.numSunLightShadows),M.push(I.numDirLightShadows),M.push(I.numPointLightShadows),M.push(I.numSpotLightShadows),M.push(I.numSpotLightShadowsWithMaps),M.push(I.numLightProbes),M.push(I.shadowMapType),M.push(I.toneMapping),M.push(I.numClippingPlanes),M.push(I.numClipIntersection),M.push(I.depthPacking)}function A(M,I){if(H.disableAll(),I.instancing)H.enable(0);if(I.instancingColor)H.enable(1);if(I.instancingMorph)H.enable(2);if(I.matcap)H.enable(3);if(I.envMap)H.enable(4);if(I.normalMapObjectSpace)H.enable(5);if(I.normalMapTangentSpace)H.enable(6);if(I.clearcoat)H.enable(7);if(I.iridescence)H.enable(8);if(I.alphaTest)H.enable(9);if(I.vertexColors)H.enable(10);if(I.vertexAlphas)H.enable(11);if(I.vertexUv1s)H.enable(12);if(I.vertexUv2s)H.enable(13);if(I.vertexUv3s)H.enable(14);if(I.vertexTangents)H.enable(15);if(I.anisotropy)H.enable(16);if(I.alphaHash)H.enable(17);if(I.batching)H.enable(18);if(I.dispersion)H.enable(19);if(I.retroreflection)H.enable(24);if(I.batchingColor)H.enable(20);if(I.gradientMap)H.enable(21);if(I.packedNormalMap)H.enable(22);if(I.vertexNormals)H.enable(23);if(M.push(H.mask),H.disableAll(),I.fog)H.enable(0);if(I.useFog)H.enable(1);if(I.flatShading)H.enable(2);if(I.logarithmicDepthBuffer)H.enable(3);if(I.reversedDepthBuffer)H.enable(4);if(I.skinning)H.enable(5);if(I.morphTargets)H.enable(6);if(I.morphNormals)H.enable(7);if(I.morphColors)H.enable(8);if(I.premultipliedAlpha)H.enable(9);if(I.shadowMapEnabled)H.enable(10);if(I.doubleSided)H.enable(11);if(I.flipSided)H.enable(12);if(I.useDepthPacking)H.enable(13);if(I.dithering)H.enable(14);if(I.transmission)H.enable(15);if(I.sheen)H.enable(16);if(I.opaque)H.enable(17);if(I.pointsUvs)H.enable(18);if(I.decodeVideoTexture)H.enable(19);if(I.decodeVideoTextureEmissive)H.enable(20);if(I.alphaToCoverage)H.enable(21);if(I.numLightProbeGrids>0)H.enable(22);if(I.hasPositionAttribute)H.enable(23);M.push(H.mask)}function C(M){let I=D[M.type],g;if(I){let v=N9[I];g=OK.clone(v.uniforms)}else g=M.uniforms;return g}function L(M,I){let g=N.get(I);if(g!==void 0)++g.usedTimes;else g=new J5(J,I,M,Z),U.push(g),N.set(I,g);return g}function z(M){if(--M.usedTimes===0){let I=U.indexOf(M);U[I]=U[U.length-1],U.pop(),N.delete(M.cacheKey),M.destroy()}}function w(M){Y.remove(M)}function _(){Y.dispose()}return{getParameters:B,getProgramCacheKey:F,getUniforms:C,acquireProgram:L,releaseProgram:z,releaseShaderCache:w,programs:U,dispose:_}}function Z5(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function W(H){J.delete(H)}function Z(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:W,update:Z,dispose:K}}function K5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function uK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function cK(){let J=[],Q=0,$=[],W=[],Z=[];function K(){Q=0,$.length=0,W.length=0,Z.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,R,B,F,q){let A=J[Q];if(A===void 0)A={id:G.id,object:G,geometry:D,material:R,materialVariant:H(G),groupOrder:B,renderOrder:G.renderOrder,z:F,group:q},J[Q]=A;else A.id=G.id,A.object=G,A.geometry=D,A.material=R,A.materialVariant=H(G),A.groupOrder=B,A.renderOrder=G.renderOrder,A.z=F,A.group=q;return Q++,A}function X(G,D,R,B,F,q,A){if(A.reversedDepth===!0)F=-F;let C=Y(G,D,R,B,F,q);if(R.transmission>0)W.push(C);else if(R.transparent===!0)Z.push(C);else $.push(C)}function U(G,D,R,B,F,q){let A=Y(G,D,R,B,F,q);if(R.transmission>0)W.unshift(A);else if(R.transparent===!0)Z.unshift(A);else $.unshift(A)}function N(G,D){if($.length>1)$.sort(G||K5);if(W.length>1)W.sort(D||uK);if(Z.length>1)Z.sort(D||uK)}function E(){for(let G=Q,D=J.length;G<D;G++){let R=J[G];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:$,transmissive:W,transparent:Z,init:K,push:X,unshift:U,finish:E,sort:N}}function H5(){let J=new WeakMap;function Q(W,Z){let K=J.get(W),H;if(K===void 0)H=new cK,J.set(W,[H]);else if(Z>=K.length)H=new cK,K.push(H);else H=K[Z];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function Y5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={direction:new S,color:new m0};break;case"SpotLight":$={position:new S,direction:new S,color:new m0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new S,color:new m0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new S,skyColor:new m0,groundColor:new m0};break;case"RectAreaLight":$={color:new m0,position:new S,halfWidth:new S,halfHeight:new S};break}return J[Q.id]=$,$}}}function X5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var U5=0;function G5(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function N5(J){let Q=new Y5,$=X5(),W={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)W.probe.push(new S);let Z=new S,K=new JJ,H=new JJ;function Y(U){let N=0,E=0,G=0;for(let h=0;h<9;h++)W.probe[h].set(0,0,0);let D=0,R=0,B=0,F=0,q=0,A=0,C=0,L=0,z=0,w=0,_=0,M=0,I=0,g=0;U.sort(G5);for(let h=0,i=U.length;h<i;h++){let T=U[h],p=T.color,o=T.intensity,m=T.distance,Z0=null;if(T.shadow&&T.shadow.map)if(T.shadow.map.texture.format===n9)Z0=T.shadow.map.texture;else Z0=T.shadow.map.depthTexture||T.shadow.map.texture;if(T.isAmbientLight)N+=p.r*o,E+=p.g*o,G+=p.b*o;else if(T.isLightProbe){for(let u=0;u<9;u++)W.probe[u].addScaledVector(T.sh.coefficients[u],o);g++}else if(T.isSunLight){let u=Q.get(T);if(u.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let r=T.shadow,Q0=$.get(T);Q0.shadowIntensity=r.intensity,Q0.shadowBias=r.bias,Q0.shadowNormalBias=r.normalBias,Q0.shadowRadius=r.radius,Q0.shadowMapSize.copy(r.mapSize).multiply(r.getFrameExtents()),W.sunShadow[R]=Q0,W.sunShadowMap[R]=Z0;let T0=r.getViewportCount();for(let S0=0;S0<T0;S0++)W.sunShadowMatrix[B+S0]=r.getMatrix(S0),W.sunShadowCascade[B+S0]=r._cascadeData[S0];B+=T0,R++}W.sun[D]=u,D++}else if(T.isDirectionalLight){let u=Q.get(T);if(u.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let r=T.shadow,Q0=$.get(T);Q0.shadowIntensity=r.intensity,Q0.shadowBias=r.bias,Q0.shadowNormalBias=r.normalBias,Q0.shadowRadius=r.radius,Q0.shadowMapSize=r.mapSize,W.directionalShadow[F]=Q0,W.directionalShadowMap[F]=Z0,W.directionalShadowMatrix[F]=T.shadow.matrix,z++}W.directional[F]=u,F++}else if(T.isSpotLight){let u=Q.get(T);u.position.setFromMatrixPosition(T.matrixWorld),u.color.copy(p).multiplyScalar(o),u.distance=m,u.coneCos=Math.cos(T.angle),u.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),u.decay=T.decay,W.spot[A]=u;let r=T.shadow;if(T.map){if(W.spotLightMap[M]=T.map,M++,r.updateMatrices(T),T.castShadow)I++}if(W.spotLightMatrix[A]=r.matrix,T.castShadow){let Q0=$.get(T);Q0.shadowIntensity=r.intensity,Q0.shadowBias=r.bias,Q0.shadowNormalBias=r.normalBias,Q0.shadowRadius=r.radius,Q0.shadowMapSize=r.mapSize,W.spotShadow[A]=Q0,W.spotShadowMap[A]=Z0,_++}A++}else if(T.isRectAreaLight){let u=Q.get(T);u.color.copy(p).multiplyScalar(o),u.halfWidth.set(T.width*0.5,0,0),u.halfHeight.set(0,T.height*0.5,0),W.rectArea[C]=u,C++}else if(T.isPointLight){let u=Q.get(T);if(u.color.copy(T.color).multiplyScalar(T.intensity),u.distance=T.distance,u.decay=T.decay,T.castShadow){let r=T.shadow,Q0=$.get(T);Q0.shadowIntensity=r.intensity,Q0.shadowBias=r.bias,Q0.shadowNormalBias=r.normalBias,Q0.shadowRadius=r.radius,Q0.shadowMapSize=r.mapSize,Q0.shadowCameraNear=r.camera.near,Q0.shadowCameraFar=r.camera.far,W.pointShadow[q]=Q0,W.pointShadowMap[q]=Z0,W.pointShadowMatrix[q]=T.shadow.matrix,w++}W.point[q]=u,q++}else if(T.isHemisphereLight){let u=Q.get(T);u.skyColor.copy(T.color).multiplyScalar(o),u.groundColor.copy(T.groundColor).multiplyScalar(o),W.hemi[L]=u,L++}}if(C>0)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=D0.LTC_FLOAT_1,W.rectAreaLTC2=D0.LTC_FLOAT_2;else W.rectAreaLTC1=D0.LTC_HALF_1,W.rectAreaLTC2=D0.LTC_HALF_2;W.ambient[0]=N,W.ambient[1]=E,W.ambient[2]=G;let v=W.hash;if(v.sunLength!==D||v.directionalLength!==F||v.pointLength!==q||v.spotLength!==A||v.rectAreaLength!==C||v.hemiLength!==L||v.numSunShadows!==R||v.numDirectionalShadows!==z||v.numPointShadows!==w||v.numSpotShadows!==_||v.numSpotMaps!==M||v.numLightProbes!==g)W.sun.length=D,W.directional.length=F,W.spot.length=A,W.rectArea.length=C,W.point.length=q,W.hemi.length=L,W.sunShadow.length=R,W.sunShadowMap.length=R,W.sunShadowMatrix.length=B,W.sunShadowCascade.length=B,W.directionalShadow.length=z,W.directionalShadowMap.length=z,W.directionalShadowMatrix.length=z,W.pointShadow.length=w,W.pointShadowMap.length=w,W.pointShadowMatrix.length=w,W.spotShadow.length=_,W.spotShadowMap.length=_,W.spotLightMatrix.length=_+M-I,W.spotLightMap.length=M,W.numSpotLightShadowsWithMaps=I,W.numLightProbes=g,v.sunLength=D,v.directionalLength=F,v.pointLength=q,v.spotLength=A,v.rectAreaLength=C,v.hemiLength=L,v.numSunShadows=R,v.numDirectionalShadows=z,v.numPointShadows=w,v.numSpotShadows=_,v.numSpotMaps=M,v.numLightProbes=g,W.version=U5++}function X(U,N){let E=0,G=0,D=0,R=0,B=0,F=0,q=N.matrixWorldInverse;for(let A=0,C=U.length;A<C;A++){let L=U[A];if(L.isSunLight){let z=W.sun[E];z.direction.setFromMatrixPosition(L.matrixWorld),z.direction.transformDirection(q),E++}else if(L.isDirectionalLight){let z=W.directional[G];z.direction.setFromMatrixPosition(L.matrixWorld),Z.setFromMatrixPosition(L.target.matrixWorld),z.direction.sub(Z),z.direction.transformDirection(q),G++}else if(L.isSpotLight){let z=W.spot[R];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(q),z.direction.setFromMatrixPosition(L.matrixWorld),Z.setFromMatrixPosition(L.target.matrixWorld),z.direction.sub(Z),z.direction.transformDirection(q),R++}else if(L.isRectAreaLight){let z=W.rectArea[B];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(q),H.identity(),K.copy(L.matrixWorld),K.premultiply(q),H.extractRotation(K),z.halfWidth.set(L.width*0.5,0,0),z.halfHeight.set(0,L.height*0.5,0),z.halfWidth.applyMatrix4(H),z.halfHeight.applyMatrix4(H),B++}else if(L.isPointLight){let z=W.point[D];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(q),D++}else if(L.isHemisphereLight){let z=W.hemi[F];z.direction.setFromMatrixPosition(L.matrixWorld),z.direction.transformDirection(q),F++}}}return{setup:Y,setupView:X,state:W}}function nK(J){let Q=new N5(J),$=[],W=[],Z=[];function K(G){E.camera=G,$.length=0,W.length=0,Z.length=0}function H(G){$.push(G)}function Y(G){W.push(G)}function X(G){Z.push(G)}function U(){Q.setup($)}function N(G){Q.setupView($,G)}let E={lightsArray:$,shadowsArray:W,lightProbeGridArray:Z,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:E,setupLights:U,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function E5(J){let Q=new WeakMap;function $(Z,K=0){let H=Q.get(Z),Y;if(H===void 0)Y=new nK(J),Q.set(Z,[Y]);else if(K>=H.length)Y=new nK(J),H.push(Y);else Y=H[K];return Y}function W(){Q=new WeakMap}return{get:$,dispose:W}}var q5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F5=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,D5=[new S(1,0,0),new S(-1,0,0),new S(0,1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1)],O5=[new S(0,-1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1),new S(0,-1,0),new S(0,-1,0)],sK=new JJ,R7=new S,ZW=new S;function R5(J,Q,$){let W=new E7,Z=new Y0,K=new Y0,H=new DJ,Y=new f$,X=new h$,U={},N=$.maxTextureSize,E={[C8]:TJ,[TJ]:C8,[H9]:H9},G=new uJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y0},radius:{value:4}},vertexShader:q5,fragmentShader:F5}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let R=new AJ;R.setAttribute("position",new gJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let B=new kJ(R,G),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=W7;let q=this.type;this.render=function(w,_,M){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(w.length===0)return;if(this.type===HZ)f0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=W7;let I=J.getRenderTarget(),g=J.getActiveCubeFace(),v=J.getActiveMipmapLevel(),h=J.state;if(h.setBlending(Y9),h.buffers.depth.getReversed()===!0)h.buffers.color.setClear(0,0,0,0);else h.buffers.color.setClear(1,1,1,1);h.buffers.depth.setTest(!0),h.setScissorTest(!1);let i=q!==this.type;if(i)_.traverse(function(T){if(T.material)if(Array.isArray(T.material))T.material.forEach((p)=>p.needsUpdate=!0);else T.material.needsUpdate=!0});for(let T=0,p=w.length;T<p;T++){let o=w[T],m=o.shadow;if(m===void 0){f0("WebGLShadowMap:",o,"has no shadow.");continue}if(m.autoUpdate===!1&&m.needsUpdate===!1)continue;Z.copy(m.mapSize);let Z0=m.getFrameExtents();if(Z.multiply(Z0),K.copy(m.mapSize),Z.x>N||Z.y>N){if(Z.x>N)K.x=Math.floor(N/Z0.x),Z.x=K.x*Z0.x,m.mapSize.x=K.x;if(Z.y>N)K.y=Math.floor(N/Z0.y),Z.y=K.y*Z0.y,m.mapSize.y=K.y}let u=J.state.buffers.depth.getReversed();if(m.camera._reversedDepth=u,m.map===null||i===!0){if(m.map!==null){if(m.map.depthTexture!==null)m.map.depthTexture.dispose(),m.map.depthTexture=null;m.map.dispose()}if(this.type===A8){if(o.isPointLight){f0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}m.map=new pJ(Z.x,Z.y,{format:n9,type:X9,minFilter:fJ,magFilter:fJ,generateMipmaps:!1}),m.map.texture.name=o.name+".shadowMap",m.map.depthTexture=new i9(Z.x,Z.y,k9),m.map.depthTexture.name=o.name+".shadowMapDepth",m.map.depthTexture.format=u9,m.map.depthTexture.compareFunction=null,m.map.depthTexture.minFilter=S9,m.map.depthTexture.magFilter=S9}else{if(o.isPointLight)m.map=new XW(Z.x),m.map.depthTexture=new L$(Z.x,j9);else m.map=new pJ(Z.x,Z.y),m.map.depthTexture=new i9(Z.x,Z.y,j9);if(m.map.depthTexture.name=o.name+".shadowMap",m.map.depthTexture.format=u9,this.type===W7)m.map.depthTexture.compareFunction=u?N6:G6,m.map.depthTexture.minFilter=fJ,m.map.depthTexture.magFilter=fJ;else m.map.depthTexture.compareFunction=null,m.map.depthTexture.minFilter=S9,m.map.depthTexture.magFilter=S9}m.camera.updateProjectionMatrix()}if(m.map.isWebGLCubeRenderTarget!==!0&&(m.map.width!==Z.x||m.map.height!==Z.y))m.map.setSize(Z.x,Z.y);let r=m.map.isWebGLCubeRenderTarget?6:m.getViewportCount();if(o.isPointLight!==!0)m.updateMatrices(o,M);for(let Q0=0;Q0<r;Q0++){let T0=m.getCamera(Q0);if(o.isPointLight){let{camera:S0,matrix:ZJ}=m,u0=o.distance||S0.far;if(u0!==S0.far)S0.far=u0,S0.updateProjectionMatrix();R7.setFromMatrixPosition(o.matrixWorld),S0.position.copy(R7),ZW.copy(S0.position),ZW.add(D5[Q0]),S0.up.copy(O5[Q0]),S0.lookAt(ZW),S0.updateMatrixWorld(),ZJ.makeTranslation(-R7.x,-R7.y,-R7.z),sK.multiplyMatrices(S0.projectionMatrix,S0.matrixWorldInverse),m._frustum.setFromProjectionMatrix(sK,S0.coordinateSystem,S0.reversedDepth)}if(m.map.isWebGLCubeRenderTarget)J.setRenderTarget(m.map,Q0),J.clear();else{if(Q0===0)J.setRenderTarget(m.map),J.clear();let S0=m.getViewport(Q0);H.set(K.x*S0.x,K.y*S0.y,K.x*S0.z,K.y*S0.w),h.viewport(H)}W=m.getFrustum(Q0),L(_,M,T0,o,this.type)}if(m.isPointLightShadow!==!0&&this.type===A8)A(m,M);m.needsUpdate=!1}q=this.type,F.needsUpdate=!1,J.setRenderTarget(I,g,v)};function A(w,_){let M=Q.update(B);if(G.defines.VSM_SAMPLES!==w.blurSamples)G.defines.VSM_SAMPLES=w.blurSamples,D.defines.VSM_SAMPLES=w.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(w.mapPass===null)w.mapPass=new pJ(Z.x,Z.y,{format:n9,type:X9});else if(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)w.mapPass.setSize(w.map.width,w.map.height);G.uniforms.shadow_pass.value=w.map.depthTexture,G.uniforms.resolution.value.set(w.map.width,w.map.height),G.uniforms.radius.value=w.radius,J.setRenderTarget(w.mapPass),J.clear(),J.renderBufferDirect(_,null,M,G,B,null),D.uniforms.shadow_pass.value=w.mapPass.texture,D.uniforms.resolution.value.set(w.map.width,w.map.height),D.uniforms.radius.value=w.radius,J.setRenderTarget(w.map),J.clear(),J.renderBufferDirect(_,null,M,D,B,null)}function C(w,_,M,I){let g=null,v=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(v!==void 0)g=v;else if(g=M.isPointLight===!0?X:Y,J.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let h=g.uuid,i=_.uuid,T=U[h];if(T===void 0)T={},U[h]=T;let p=T[i];if(p===void 0)p=g.clone(),T[i]=p,_.addEventListener("dispose",z);g=p}if(g.visible=_.visible,g.wireframe=_.wireframe,I===A8)g.side=_.shadowSide!==null?_.shadowSide:_.side;else g.side=_.shadowSide!==null?_.shadowSide:E[_.side];if(g.alphaMap=_.alphaMap,g.alphaTest=_.alphaToCoverage===!0?0.5:_.alphaTest,g.map=_.map,g.clipShadows=_.clipShadows,g.clippingPlanes=_.clippingPlanes,g.clipIntersection=_.clipIntersection,g.displacementMap=_.displacementMap,g.displacementScale=_.displacementScale,g.displacementBias=_.displacementBias,g.wireframeLinewidth=_.wireframeLinewidth,g.linewidth=_.linewidth,M.isPointLight===!0&&g.isMeshDistanceMaterial===!0){let h=J.properties.get(g);h.light=M}return g}function L(w,_,M,I,g){if(w.visible===!1)return;if(w.layers.test(_.layers)&&(w.isMesh||w.isLine||w.isPoints)){if((w.castShadow||w.receiveShadow&&g===A8)&&(!w.frustumCulled||w.intersectsFrustum(W))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);let i=Q.update(w),T=w.material;if(Array.isArray(T)){let p=i.groups;for(let o=0,m=p.length;o<m;o++){let Z0=p[o],u=T[Z0.materialIndex];if(u&&u.visible){let r=C(w,u,I,g);w.onBeforeShadow(J,w,_,M,i,r,Z0),J.renderBufferDirect(M,null,i,r,w,Z0),w.onAfterShadow(J,w,_,M,i,r,Z0)}}}else if(T.visible){let p=C(w,T,I,g);w.onBeforeShadow(J,w,_,M,i,p,null),J.renderBufferDirect(M,null,i,p,w,null),w.onAfterShadow(J,w,_,M,i,p,null)}}}let h=w.children;for(let i=0,T=h.length;i<T;i++)L(h[i],_,M,I,g)}function z(w){w.target.removeEventListener("dispose",z);for(let M in U){let I=U[M],g=w.target.uuid;if(g in I)I[g].dispose(),delete I[g]}}}function M5(J,Q){function $(){let f=!1,E0=new DJ,s=null,q0=new DJ(0,0,0,0);return{setMask:function(V0){if(s!==V0&&!f)J.colorMask(V0,V0,V0,V0),s=V0},setLocked:function(V0){f=V0},setClear:function(V0,J0,O0,l0,EJ){if(EJ===!0)V0*=l0,J0*=l0,O0*=l0;if(E0.set(V0,J0,O0,l0),q0.equals(E0)===!1)J.clearColor(V0,J0,O0,l0),q0.copy(E0)},reset:function(){f=!1,s=null,q0.set(-1,0,0,0)}}}function W(){let f=!1,E0=!1,s=null,q0=null,V0=null;return{setReversed:function(J0){if(E0!==J0){let O0=Q.get("EXT_clip_control");if(J0)O0.clipControlEXT(O0.LOWER_LEFT_EXT,O0.ZERO_TO_ONE_EXT);else O0.clipControlEXT(O0.LOWER_LEFT_EXT,O0.NEGATIVE_ONE_TO_ONE_EXT);E0=J0;let l0=V0;V0=null,this.setClear(l0)}},getReversed:function(){return E0},setTest:function(J0){if(J0)W0(J.DEPTH_TEST);else j0(J.DEPTH_TEST)},setMask:function(J0){if(s!==J0&&!f)J.depthMask(J0),s=J0},setFunc:function(J0){if(E0)J0=ZK[J0];if(q0!==J0){switch(J0){case wZ:J.depthFunc(J.NEVER);break;case _Z:J.depthFunc(J.ALWAYS);break;case PZ:J.depthFunc(J.LESS);break;case RQ:J.depthFunc(J.LEQUAL);break;case TZ:J.depthFunc(J.EQUAL);break;case SZ:J.depthFunc(J.GEQUAL);break;case jZ:J.depthFunc(J.GREATER);break;case yZ:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}q0=J0}},setLocked:function(J0){f=J0},setClear:function(J0){if(V0!==J0){if(V0=J0,E0)J0=1-J0;J.clearDepth(J0)}},reset:function(){f=!1,s=null,q0=null,V0=null,E0=!1}}}function Z(){let f=!1,E0=null,s=null,q0=null,V0=null,J0=null,O0=null,l0=null,EJ=null;return{setTest:function(QJ){if(!f)if(QJ)W0(J.STENCIL_TEST);else j0(J.STENCIL_TEST)},setMask:function(QJ){if(E0!==QJ&&!f)J.stencilMask(QJ),E0=QJ},setFunc:function(QJ,eJ,E9){if(s!==QJ||q0!==eJ||V0!==E9)J.stencilFunc(QJ,eJ,E9),s=QJ,q0=eJ,V0=E9},setOp:function(QJ,eJ,E9){if(J0!==QJ||O0!==eJ||l0!==E9)J.stencilOp(QJ,eJ,E9),J0=QJ,O0=eJ,l0=E9},setLocked:function(QJ){f=QJ},setClear:function(QJ){if(EJ!==QJ)J.clearStencil(QJ),EJ=QJ},reset:function(){f=!1,E0=null,s=null,q0=null,V0=null,J0=null,O0=null,l0=null,EJ=null}}}let K=new $,H=new W,Y=new Z,X=new WeakMap,U=new WeakMap,N={},E={},G={},D=new WeakMap,R=[],B=null,F=!1,q=null,A=null,C=null,L=null,z=null,w=null,_=null,M=new m0(0,0,0),I=0,g=!1,v=null,h=null,i=null,T=null,p=null,o=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),m=!1,Z0=0,u=J.getParameter(J.VERSION);if(u.indexOf("WebGL")!==-1)Z0=parseFloat(/^WebGL (\d)/.exec(u)[1]),m=Z0>=1;else if(u.indexOf("OpenGL ES")!==-1)Z0=parseFloat(/^OpenGL ES (\d)/.exec(u)[1]),m=Z0>=2;let r=null,Q0={},T0=J.getParameter(J.SCISSOR_BOX),S0=J.getParameter(J.VIEWPORT),ZJ=new DJ().fromArray(T0),u0=new DJ().fromArray(S0);function n(f,E0,s,q0){let V0=new Uint8Array(4),J0=J.createTexture();J.bindTexture(f,J0),J.texParameteri(f,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(f,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let O0=0;O0<s;O0++)if(f===J.TEXTURE_3D||f===J.TEXTURE_2D_ARRAY)J.texImage3D(E0,0,J.RGBA,1,1,q0,0,J.RGBA,J.UNSIGNED_BYTE,V0);else J.texImage2D(E0+O0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,V0);return J0}let H0={};H0[J.TEXTURE_2D]=n(J.TEXTURE_2D,J.TEXTURE_2D,1),H0[J.TEXTURE_CUBE_MAP]=n(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),H0[J.TEXTURE_2D_ARRAY]=n(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),H0[J.TEXTURE_3D]=n(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),W0(J.DEPTH_TEST),H.setFunc(RQ),M0(!1),_0(qQ),W0(J.CULL_FACE),K0(Y9);function W0(f){if(N[f]!==!0)J.enable(f),N[f]=!0}function j0(f){if(N[f]!==!1)J.disable(f),N[f]=!1}function h0(f,E0){if(G[f]!==E0){if(J.bindFramebuffer(f,E0),G[f]=E0,f===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=E0;if(f===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=E0;return!0}return!1}function z0(f,E0){let s=R,q0=!1;if(f){if(s=D.get(E0),s===void 0)s=[],D.set(E0,s);let V0=f.textures;if(s.length!==V0.length||s[0]!==J.COLOR_ATTACHMENT0){for(let J0=0,O0=V0.length;J0<O0;J0++)s[J0]=J.COLOR_ATTACHMENT0+J0;s.length=V0.length,q0=!0}}else if(s[0]!==J.BACK)s[0]=J.BACK,q0=!0;if(q0)J.drawBuffers(s)}function KJ(f){if(B!==f)return J.useProgram(f),B=f,!0;return!1}let t={[w8]:J.FUNC_ADD,[XZ]:J.FUNC_SUBTRACT,[UZ]:J.FUNC_REVERSE_SUBTRACT};t[GZ]=J.MIN,t[NZ]=J.MAX;let $0={[EZ]:J.ZERO,[qZ]:J.ONE,[FZ]:J.SRC_COLOR,[OZ]:J.SRC_ALPHA,[BZ]:J.SRC_ALPHA_SATURATE,[LZ]:J.DST_COLOR,[MZ]:J.DST_ALPHA,[DZ]:J.ONE_MINUS_SRC_COLOR,[RZ]:J.ONE_MINUS_SRC_ALPHA,[VZ]:J.ONE_MINUS_DST_COLOR,[kZ]:J.ONE_MINUS_DST_ALPHA,[IZ]:J.CONSTANT_COLOR,[zZ]:J.ONE_MINUS_CONSTANT_COLOR,[AZ]:J.CONSTANT_ALPHA,[CZ]:J.ONE_MINUS_CONSTANT_ALPHA};function K0(f,E0,s,q0,V0,J0,O0,l0,EJ,QJ){if(f===Y9){if(F===!0)j0(J.BLEND),F=!1;return}if(F===!1)W0(J.BLEND),F=!0;if(f!==YZ){if(f!==q||QJ!==g){if(A!==w8||z!==w8)J.blendEquation(J.FUNC_ADD),A=w8,z=w8;if(QJ)switch(f){case Z7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case FQ:J.blendFunc(J.ONE,J.ONE);break;case DQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case OQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:x0("WebGLState: Invalid blending: ",f);break}else switch(f){case Z7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case FQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case DQ:x0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case OQ:x0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:x0("WebGLState: Invalid blending: ",f);break}C=null,L=null,w=null,_=null,M.set(0,0,0),I=0,q=f,g=QJ}return}if(V0=V0||E0,J0=J0||s,O0=O0||q0,E0!==A||V0!==z)J.blendEquationSeparate(t[E0],t[V0]),A=E0,z=V0;if(s!==C||q0!==L||J0!==w||O0!==_)J.blendFuncSeparate($0[s],$0[q0],$0[J0],$0[O0]),C=s,L=q0,w=J0,_=O0;if(l0.equals(M)===!1||EJ!==I)J.blendColor(l0.r,l0.g,l0.b,EJ),M.copy(l0),I=EJ;q=f,g=!1}function X0(f,E0){f.side===H9?j0(J.CULL_FACE):W0(J.CULL_FACE);let s=f.side===TJ;if(E0)s=!s;M0(s),f.blending===Z7&&f.transparent===!1?K0(Y9):K0(f.blending,f.blendEquation,f.blendSrc,f.blendDst,f.blendEquationAlpha,f.blendSrcAlpha,f.blendDstAlpha,f.blendColor,f.blendAlpha,f.premultipliedAlpha),H.setFunc(f.depthFunc),H.setTest(f.depthTest),H.setMask(f.depthWrite),K.setMask(f.colorWrite);let q0=f.stencilWrite;if(Y.setTest(q0),q0)Y.setMask(f.stencilWriteMask),Y.setFunc(f.stencilFunc,f.stencilRef,f.stencilFuncMask),Y.setOp(f.stencilFail,f.stencilZFail,f.stencilZPass);p0(f.polygonOffset,f.polygonOffsetFactor,f.polygonOffsetUnits),f.alphaToCoverage===!0?W0(J.SAMPLE_ALPHA_TO_COVERAGE):j0(J.SAMPLE_ALPHA_TO_COVERAGE)}function M0(f){if(v!==f){if(f)J.frontFace(J.CW);else J.frontFace(J.CCW);v=f}}function _0(f){if(f!==ZZ){if(W0(J.CULL_FACE),f!==h)if(f===qQ)J.cullFace(J.BACK);else if(f===KZ)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else j0(J.CULL_FACE);h=f}function y0(f){if(f!==i){if(m)J.lineWidth(f);i=f}}function p0(f,E0,s){if(f){if(W0(J.POLYGON_OFFSET_FILL),T!==E0||p!==s){if(T=E0,p=s,H.getReversed())E0=-E0;J.polygonOffset(E0,s)}}else j0(J.POLYGON_OFFSET_FILL)}function d0(f){if(f)W0(J.SCISSOR_TEST);else j0(J.SCISSOR_TEST)}function P(f){if(f===void 0)f=J.TEXTURE0+o-1;if(r!==f)J.activeTexture(f),r=f}function XJ(f,E0,s){if(s===void 0)if(r===null)s=J.TEXTURE0+o-1;else s=r;let q0=Q0[s];if(q0===void 0)q0={type:void 0,texture:void 0},Q0[s]=q0;if(q0.type!==f||q0.texture!==E0){if(r!==s)J.activeTexture(s),r=s;J.bindTexture(f,E0||H0[f]),q0.type=f,q0.texture=E0}}function i0(){let f=Q0[r];if(f!==void 0&&f.type!==void 0)J.bindTexture(f.type,null),f.type=void 0,f.texture=void 0}function o0(){try{J.compressedTexImage2D(...arguments)}catch(f){x0("WebGLState:",f)}}function V(){try{J.compressedTexImage3D(...arguments)}catch(f){x0("WebGLState:",f)}}function O(){try{J.texSubImage2D(...arguments)}catch(f){x0("WebGLState:",f)}}function j(){try{J.texSubImage3D(...arguments)}catch(f){x0("WebGLState:",f)}}function d(){try{J.compressedTexSubImage2D(...arguments)}catch(f){x0("WebGLState:",f)}}function e(){try{J.compressedTexSubImage3D(...arguments)}catch(f){x0("WebGLState:",f)}}function U0(){try{J.texStorage2D(...arguments)}catch(f){x0("WebGLState:",f)}}function N0(){try{J.texStorage3D(...arguments)}catch(f){x0("WebGLState:",f)}}function c(){try{J.texImage2D(...arguments)}catch(f){x0("WebGLState:",f)}}function a(){try{J.texImage3D(...arguments)}catch(f){x0("WebGLState:",f)}}function L0(f){if(E[f]!==void 0)return E[f];else return J.getParameter(f)}function P0(f,E0){if(E[f]!==E0)J.pixelStorei(f,E0),E[f]=E0}function F0(f){if(ZJ.equals(f)===!1)J.scissor(f.x,f.y,f.z,f.w),ZJ.copy(f)}function G0(f){if(u0.equals(f)===!1)J.viewport(f.x,f.y,f.z,f.w),u0.copy(f)}function v0(f,E0){let s=U.get(E0);if(s===void 0)s=new WeakMap,U.set(E0,s);let q0=s.get(f);if(q0===void 0)q0=J.getUniformBlockIndex(E0,f.name),s.set(f,q0)}function b0(f,E0){let q0=U.get(E0).get(f);if(X.get(E0)!==q0)J.uniformBlockBinding(E0,q0,f.__bindingPointIndex),X.set(E0,q0)}function e0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},E={},r=null,Q0={},G={},D=new WeakMap,R=[],B=null,F=!1,q=null,A=null,C=null,L=null,z=null,w=null,_=null,M=new m0(0,0,0),I=0,g=!1,v=null,h=null,i=null,T=null,p=null,ZJ.set(0,0,J.canvas.width,J.canvas.height),u0.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:W0,disable:j0,bindFramebuffer:h0,drawBuffers:z0,useProgram:KJ,setBlending:K0,setMaterial:X0,setFlipSided:M0,setCullFace:_0,setLineWidth:y0,setPolygonOffset:p0,setScissorTest:d0,activeTexture:P,bindTexture:XJ,unbindTexture:i0,compressedTexImage2D:o0,compressedTexImage3D:V,texImage2D:c,texImage3D:a,pixelStorei:P0,getParameter:L0,updateUBOMapping:v0,uniformBlockBinding:b0,texStorage2D:U0,texStorage3D:N0,texSubImage2D:O,texSubImage3D:j,compressedTexSubImage2D:d,compressedTexSubImage3D:e,scissor:F0,viewport:G0,reset:e0}}function k5(J,Q,$,W,Z,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new Y0,N=new WeakMap,E=new Set,G,D=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(V){}function B(V,O){return R?new OffscreenCanvas(V,O):r8("canvas")}function F(V,O,j){let d=1,e=o0(V);if(e.width>j||e.height>j)d=j/Math.max(e.width,e.height);if(d<1)if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&V instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&V instanceof ImageBitmap||typeof VideoFrame<"u"&&V instanceof VideoFrame){let U0=Math.floor(d*e.width),N0=Math.floor(d*e.height);if(G===void 0)G=B(U0,N0);let c=O?B(U0,N0):G;return c.width=U0,c.height=N0,c.getContext("2d").drawImage(V,0,0,U0,N0),f0("WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+U0+"x"+N0+")."),c}else{if("data"in V)f0("WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+").");return V}return V}function q(V){return V.generateMipmaps}function A(V){J.generateMipmap(V)}function C(V){if(V.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(V.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(V.isWebGLArrayRenderTarget||V.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function L(V,O,j,d,e,U0=!1){if(V!==null){if(J[V]!==void 0)return J[V];f0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+V+"'")}let N0;if(d){if(N0=Q.get("EXT_texture_norm16"),!N0)f0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let c=O;if(O===J.RED){if(j===J.FLOAT)c=J.R32F;if(j===J.HALF_FLOAT)c=J.R16F;if(j===J.UNSIGNED_BYTE)c=J.R8;if(j===J.UNSIGNED_SHORT&&N0)c=N0.R16_EXT;if(j===J.SHORT&&N0)c=N0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(j===J.UNSIGNED_BYTE)c=J.R8UI;if(j===J.UNSIGNED_SHORT)c=J.R16UI;if(j===J.UNSIGNED_INT)c=J.R32UI;if(j===J.BYTE)c=J.R8I;if(j===J.SHORT)c=J.R16I;if(j===J.INT)c=J.R32I}if(O===J.RG){if(j===J.FLOAT)c=J.RG32F;if(j===J.HALF_FLOAT)c=J.RG16F;if(j===J.UNSIGNED_BYTE)c=J.RG8;if(j===J.UNSIGNED_SHORT&&N0)c=N0.RG16_EXT;if(j===J.SHORT&&N0)c=N0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(j===J.UNSIGNED_BYTE)c=J.RG8UI;if(j===J.UNSIGNED_SHORT)c=J.RG16UI;if(j===J.UNSIGNED_INT)c=J.RG32UI;if(j===J.BYTE)c=J.RG8I;if(j===J.SHORT)c=J.RG16I;if(j===J.INT)c=J.RG32I}if(O===J.RGB_INTEGER){if(j===J.UNSIGNED_BYTE)c=J.RGB8UI;if(j===J.UNSIGNED_SHORT)c=J.RGB16UI;if(j===J.UNSIGNED_INT)c=J.RGB32UI;if(j===J.BYTE)c=J.RGB8I;if(j===J.SHORT)c=J.RGB16I;if(j===J.INT)c=J.RGB32I}if(O===J.RGBA_INTEGER){if(j===J.UNSIGNED_BYTE)c=J.RGBA8UI;if(j===J.UNSIGNED_SHORT)c=J.RGBA16UI;if(j===J.UNSIGNED_INT)c=J.RGBA32UI;if(j===J.BYTE)c=J.RGBA8I;if(j===J.SHORT)c=J.RGBA16I;if(j===J.INT)c=J.RGBA32I}if(O===J.RGB){if(j===J.UNSIGNED_SHORT&&N0)c=N0.RGB16_EXT;if(j===J.SHORT&&N0)c=N0.RGB16_SNORM_EXT;if(j===J.UNSIGNED_INT_5_9_9_9_REV)c=J.RGB9_E5;if(j===J.UNSIGNED_INT_10F_11F_11F_REV)c=J.R11F_G11F_B10F}if(O===J.RGBA){let a=U0?U$:r0.getTransfer(e);if(j===J.FLOAT)c=J.RGBA32F;if(j===J.HALF_FLOAT)c=J.RGBA16F;if(j===J.UNSIGNED_BYTE)c=a===NJ?J.SRGB8_ALPHA8:J.RGBA8;if(j===J.UNSIGNED_SHORT&&N0)c=N0.RGBA16_EXT;if(j===J.SHORT&&N0)c=N0.RGBA16_SNORM_EXT;if(j===J.UNSIGNED_SHORT_4_4_4_4)c=J.RGBA4;if(j===J.UNSIGNED_SHORT_5_5_5_1)c=J.RGB5_A1}if(c===J.R16F||c===J.R32F||c===J.RG16F||c===J.RG32F||c===J.RGBA16F||c===J.RGBA32F)Q.get("EXT_color_buffer_float");return c}function z(V,O){let j;if(V){if(O===null||O===j9||O===P8)j=J.DEPTH24_STENCIL8;else if(O===k9)j=J.DEPTH32F_STENCIL8;else if(O===Y7)j=J.DEPTH24_STENCIL8,f0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===j9||O===P8)j=J.DEPTH_COMPONENT24;else if(O===k9)j=J.DEPTH_COMPONENT32F;else if(O===Y7)j=J.DEPTH_COMPONENT16;return j}function w(V,O){if(q(V)===!0||V.isFramebufferTexture&&V.minFilter!==S9&&V.minFilter!==fJ)return Math.log2(Math.max(O.width,O.height))+1;else if(V.mipmaps!==void 0&&V.mipmaps.length>0)return V.mipmaps.length;else if(V.isCompressedTexture&&Array.isArray(V.image))return O.mipmaps.length;else return 1}function _(V){let O=V.target;if(O.removeEventListener("dispose",_),I(O),O.isVideoTexture)N.delete(O);if(O.isHTMLTexture)E.delete(O)}function M(V){let O=V.target;O.removeEventListener("dispose",M),v(O)}function I(V){let O=W.get(V);if(O.__webglInit===void 0)return;let j=V.source,d=D.get(j);if(d){let e=d[O.__cacheKey];if(e.usedTimes--,e.usedTimes===0)g(V);if(Object.keys(d).length===0)D.delete(j)}W.remove(V)}function g(V){let O=W.get(V);J.deleteTexture(O.__webglTexture);let j=V.source,d=D.get(j);delete d[O.__cacheKey],H.memory.textures--}function v(V){let O=W.get(V);if(V.depthTexture)V.depthTexture.dispose(),W.remove(V.depthTexture);if(V.isWebGLCubeRenderTarget)for(let d=0;d<6;d++){if(Array.isArray(O.__webglFramebuffer[d]))for(let e=0;e<O.__webglFramebuffer[d].length;e++)J.deleteFramebuffer(O.__webglFramebuffer[d][e]);else J.deleteFramebuffer(O.__webglFramebuffer[d]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[d])}else{if(Array.isArray(O.__webglFramebuffer))for(let d=0;d<O.__webglFramebuffer.length;d++)J.deleteFramebuffer(O.__webglFramebuffer[d]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let d=0;d<O.__webglColorRenderbuffer.length;d++)if(O.__webglColorRenderbuffer[d])J.deleteRenderbuffer(O.__webglColorRenderbuffer[d])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let j=V.textures;for(let d=0,e=j.length;d<e;d++){let U0=W.get(j[d]);if(U0.__webglTexture)J.deleteTexture(U0.__webglTexture),H.memory.textures--;W.remove(j[d])}W.remove(V)}let h=0;function i(){h=0}function T(){return h}function p(V){h=V}function o(){let V=h;if(V>=Z.maxTextures)f0("WebGLTextures: Trying to use "+(V+1)+" texture units while this GPU supports only "+Z.maxTextures);return h+=1,V}function m(V){let O=[];return O.push(V.wrapS),O.push(V.wrapT),O.push(V.wrapR||0),O.push(V.magFilter),O.push(V.minFilter),O.push(V.anisotropy),O.push(V.internalFormat),O.push(V.format),O.push(V.type),O.push(V.generateMipmaps),O.push(V.premultiplyAlpha),O.push(V.flipY),O.push(V.unpackAlignment),O.push(V.colorSpace),O.join()}function Z0(V,O){let j=W.get(V);if(V.isVideoTexture)XJ(V);if(V.isRenderTargetTexture===!1&&V.isExternalTexture!==!0&&V.version>0&&j.__version!==V.version){let d=V.image;if(d===null)f0("WebGLRenderer: Texture marked for update but no image data found.");else if(d.complete===!1)f0("WebGLRenderer: Texture marked for update but image is incomplete");else{j0(j,V,O);return}}else if(V.isExternalTexture)j.__webglTexture=V.sourceTexture?V.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,j.__webglTexture,J.TEXTURE0+O)}function u(V,O){let j=W.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&j.__version!==V.version){j0(j,V,O);return}else if(V.isExternalTexture)j.__webglTexture=V.sourceTexture?V.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,j.__webglTexture,J.TEXTURE0+O)}function r(V,O){let j=W.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&j.__version!==V.version){j0(j,V,O);return}$.bindTexture(J.TEXTURE_3D,j.__webglTexture,J.TEXTURE0+O)}function Q0(V,O){let j=W.get(V);if(V.isCubeDepthTexture!==!0&&V.version>0&&j.__version!==V.version){h0(j,V,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,j.__webglTexture,J.TEXTURE0+O)}let T0={[bZ]:J.REPEAT,[$6]:J.CLAMP_TO_EDGE,[xZ]:J.MIRRORED_REPEAT},S0={[S9]:J.NEAREST,[gZ]:J.NEAREST_MIPMAP_NEAREST,[H7]:J.NEAREST_MIPMAP_LINEAR,[fJ]:J.LINEAR,[W6]:J.LINEAR_MIPMAP_NEAREST,[l9]:J.LINEAR_MIPMAP_LINEAR},ZJ={[oZ]:J.NEVER,[JK]:J.ALWAYS,[aZ]:J.LESS,[G6]:J.LEQUAL,[rZ]:J.EQUAL,[N6]:J.GEQUAL,[tZ]:J.GREATER,[eZ]:J.NOTEQUAL};function u0(V,O){if(O.type===k9&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===fJ||O.magFilter===W6||O.magFilter===H7||O.magFilter===l9||O.minFilter===fJ||O.minFilter===W6||O.minFilter===H7||O.minFilter===l9))f0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(V,J.TEXTURE_WRAP_S,T0[O.wrapS]),J.texParameteri(V,J.TEXTURE_WRAP_T,T0[O.wrapT]),V===J.TEXTURE_3D||V===J.TEXTURE_2D_ARRAY)J.texParameteri(V,J.TEXTURE_WRAP_R,T0[O.wrapR]);if(J.texParameteri(V,J.TEXTURE_MAG_FILTER,S0[O.magFilter]),J.texParameteri(V,J.TEXTURE_MIN_FILTER,S0[O.minFilter]),O.compareFunction)J.texParameteri(V,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(V,J.TEXTURE_COMPARE_FUNC,ZJ[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===S9)return;if(O.minFilter!==H7&&O.minFilter!==l9)return;if(O.type===k9&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||W.get(O).__currentAnisotropy){let j=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(V,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,Z.getMaxAnisotropy())),W.get(O).__currentAnisotropy=O.anisotropy}}}function n(V,O){let j=!1;if(V.__webglInit===void 0)V.__webglInit=!0,O.addEventListener("dispose",_);let d=O.source,e=D.get(d);if(e===void 0)e={},D.set(d,e);let U0=m(O);if(U0!==V.__cacheKey){if(e[U0]===void 0)e[U0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,j=!0;e[U0].usedTimes++;let N0=e[V.__cacheKey];if(N0!==void 0){if(e[V.__cacheKey].usedTimes--,N0.usedTimes===0)g(O)}V.__cacheKey=U0,V.__webglTexture=e[U0].texture}return j}function H0(V,O,j){return Math.floor(Math.floor(V/j)/O)}function W0(V,O,j,d){let U0=V.updateRanges;if(U0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,j,d,O.data);else{U0.sort((P0,F0)=>P0.start-F0.start);let N0=0;for(let P0=1;P0<U0.length;P0++){let F0=U0[N0],G0=U0[P0],v0=F0.start+F0.count,b0=H0(G0.start,O.width,4),e0=H0(F0.start,O.width,4);if(G0.start<=v0+1&&b0===e0&&H0(G0.start+G0.count-1,O.width,4)===b0)F0.count=Math.max(F0.count,G0.start+G0.count-F0.start);else++N0,U0[N0]=G0}U0.length=N0+1;let c=$.getParameter(J.UNPACK_ROW_LENGTH),a=$.getParameter(J.UNPACK_SKIP_PIXELS),L0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let P0=0,F0=U0.length;P0<F0;P0++){let G0=U0[P0],v0=Math.floor(G0.start/4),b0=Math.ceil(G0.count/4),e0=v0%O.width,f=Math.floor(v0/O.width),E0=b0,s=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,e0),$.pixelStorei(J.UNPACK_SKIP_ROWS,f),$.texSubImage2D(J.TEXTURE_2D,0,e0,f,E0,1,j,d,O.data)}V.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,c),$.pixelStorei(J.UNPACK_SKIP_PIXELS,a),$.pixelStorei(J.UNPACK_SKIP_ROWS,L0)}}function j0(V,O,j){let d=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)d=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)d=J.TEXTURE_3D;let e=n(V,O),U0=O.source;$.bindTexture(d,V.__webglTexture,J.TEXTURE0+j);let N0=W.get(U0);if(U0.version!==N0.__version||e===!0){if($.activeTexture(J.TEXTURE0+j),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let s=r0.getPrimaries(r0.workingColorSpace),q0=O.colorSpace===s9?null:r0.getPrimaries(O.colorSpace),V0=O.colorSpace===s9||s===q0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,V0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let a=F(O.image,!1,Z.maxTextureSize);a=i0(O,a);let L0=K.convert(O.format,O.colorSpace),P0=K.convert(O.type),F0=L(O.internalFormat,L0,P0,O.normalized,O.colorSpace,O.isVideoTexture);u0(d,O);let G0,v0=O.mipmaps,b0=O.isVideoTexture!==!0,e0=N0.__version===void 0||e===!0,f=U0.dataReady,E0=w(O,a);if(O.isDepthTexture){if(F0=z(O.format===c9,O.type),e0)if(b0)$.texStorage2D(J.TEXTURE_2D,1,F0,a.width,a.height);else $.texImage2D(J.TEXTURE_2D,0,F0,a.width,a.height,0,L0,P0,null)}else if(O.isDataTexture)if(v0.length>0){if(b0&&e0)$.texStorage2D(J.TEXTURE_2D,E0,F0,v0[0].width,v0[0].height);for(let s=0,q0=v0.length;s<q0;s++)if(G0=v0[s],b0){if(f)$.texSubImage2D(J.TEXTURE_2D,s,0,0,G0.width,G0.height,L0,P0,G0.data)}else $.texImage2D(J.TEXTURE_2D,s,F0,G0.width,G0.height,0,L0,P0,G0.data);O.generateMipmaps=!1}else if(b0){if(e0)$.texStorage2D(J.TEXTURE_2D,E0,F0,a.width,a.height);if(f)W0(O,a,L0,P0)}else $.texImage2D(J.TEXTURE_2D,0,F0,a.width,a.height,0,L0,P0,a.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(b0&&e0)$.texStorage3D(J.TEXTURE_2D_ARRAY,E0,F0,v0[0].width,v0[0].height,a.depth);for(let s=0,q0=v0.length;s<q0;s++)if(G0=v0[s],O.format!==U9)if(L0!==null)if(b0){if(f)if(O.layerUpdates.size>0){let V0=t$(G0.width,G0.height,O.format,O.type);for(let J0 of O.layerUpdates){let O0=G0.data.subarray(J0*V0/G0.data.BYTES_PER_ELEMENT,(J0+1)*V0/G0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,J0,G0.width,G0.height,1,L0,O0)}}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,G0.width,G0.height,a.depth,L0,G0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,s,F0,G0.width,G0.height,a.depth,0,G0.data,0,0);else f0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(b0){if(f)$.texSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,G0.width,G0.height,a.depth,L0,P0,G0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,s,F0,G0.width,G0.height,a.depth,0,L0,P0,G0.data);if(O.layerUpdates.size>0)O.clearLayerUpdates()}else{if(b0&&e0)$.texStorage2D(J.TEXTURE_2D,E0,F0,v0[0].width,v0[0].height);for(let s=0,q0=v0.length;s<q0;s++)if(G0=v0[s],O.format!==U9)if(L0!==null)if(b0){if(f)$.compressedTexSubImage2D(J.TEXTURE_2D,s,0,0,G0.width,G0.height,L0,G0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,s,F0,G0.width,G0.height,0,G0.data);else f0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(b0){if(f)$.texSubImage2D(J.TEXTURE_2D,s,0,0,G0.width,G0.height,L0,P0,G0.data)}else $.texImage2D(J.TEXTURE_2D,s,F0,G0.width,G0.height,0,L0,P0,G0.data)}else if(O.isDataArrayTexture)if(b0){if(e0)$.texStorage3D(J.TEXTURE_2D_ARRAY,E0,F0,a.width,a.height,a.depth);if(f)if(O.layerUpdates.size>0){let s=t$(a.width,a.height,O.format,O.type);for(let q0 of O.layerUpdates){let V0=a.data.subarray(q0*s/a.data.BYTES_PER_ELEMENT,(q0+1)*s/a.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,q0,a.width,a.height,1,L0,P0,V0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,a.width,a.height,a.depth,L0,P0,a.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,F0,a.width,a.height,a.depth,0,L0,P0,a.data);else if(O.isData3DTexture)if(b0){if(e0)$.texStorage3D(J.TEXTURE_3D,E0,F0,a.width,a.height,a.depth);if(f)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,a.width,a.height,a.depth,L0,P0,a.data)}else $.texImage3D(J.TEXTURE_3D,0,F0,a.width,a.height,a.depth,0,L0,P0,a.data);else if(O.isFramebufferTexture){if(e0)if(b0)$.texStorage2D(J.TEXTURE_2D,E0,F0,a.width,a.height);else{let{width:s,height:q0}=a;for(let V0=0;V0<E0;V0++)$.texImage2D(J.TEXTURE_2D,V0,F0,s,q0,0,L0,P0,null),s>>=1,q0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let s=J.canvas;if(!s.hasAttribute("layoutsubtree"))s.setAttribute("layoutsubtree","true");if(a.parentNode!==s){s.appendChild(a),E.add(O),s.onpaint=(q0)=>{let V0=q0.changedElements;for(let J0 of E)if(V0.includes(J0.image))J0.needsUpdate=!0},s.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,a);else{let{RGBA:V0,RGBA:J0,UNSIGNED_BYTE:O0}=J;J.texElementImage2D(J.TEXTURE_2D,0,V0,J0,O0,a)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(v0.length>0){if(b0&&e0){let s=o0(v0[0]);$.texStorage2D(J.TEXTURE_2D,E0,F0,s.width,s.height)}for(let s=0,q0=v0.length;s<q0;s++)if(G0=v0[s],b0){if(f)$.texSubImage2D(J.TEXTURE_2D,s,0,0,L0,P0,G0)}else $.texImage2D(J.TEXTURE_2D,s,F0,L0,P0,G0);O.generateMipmaps=!1}else if(b0){if(e0){let s=o0(a);$.texStorage2D(J.TEXTURE_2D,E0,F0,s.width,s.height)}if(f)$.texSubImage2D(J.TEXTURE_2D,0,0,0,L0,P0,a)}else $.texImage2D(J.TEXTURE_2D,0,F0,L0,P0,a);if(q(O))A(d);if(N0.__version=U0.version,O.onUpdate)O.onUpdate(O)}V.__version=O.version}function h0(V,O,j){if(O.image.length!==6)return;let d=n(V,O),e=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,V.__webglTexture,J.TEXTURE0+j);let U0=W.get(e);if(e.version!==U0.__version||d===!0){$.activeTexture(J.TEXTURE0+j);let N0=r0.getPrimaries(r0.workingColorSpace),c=O.colorSpace===s9?null:r0.getPrimaries(O.colorSpace),a=O.colorSpace===s9||N0===c?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,a);let L0=O.isCompressedTexture||O.image[0].isCompressedTexture,P0=O.image[0]&&O.image[0].isDataTexture,F0=[];for(let J0=0;J0<6;J0++){if(!L0&&!P0)F0[J0]=F(O.image[J0],!0,Z.maxCubemapSize);else F0[J0]=P0?O.image[J0].image:O.image[J0];F0[J0]=i0(O,F0[J0])}let G0=F0[0],v0=K.convert(O.format,O.colorSpace),b0=K.convert(O.type),e0=L(O.internalFormat,v0,b0,O.normalized,O.colorSpace),f=O.isVideoTexture!==!0,E0=U0.__version===void 0||d===!0,s=e.dataReady,q0=w(O,G0);u0(J.TEXTURE_CUBE_MAP,O);let V0;if(L0){if(f&&E0)$.texStorage2D(J.TEXTURE_CUBE_MAP,q0,e0,G0.width,G0.height);for(let J0=0;J0<6;J0++){V0=F0[J0].mipmaps;for(let O0=0;O0<V0.length;O0++){let l0=V0[O0];if(O.format!==U9)if(v0!==null)if(f){if(s)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0,0,0,l0.width,l0.height,v0,l0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0,e0,l0.width,l0.height,0,l0.data);else f0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(f){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0,0,0,l0.width,l0.height,v0,b0,l0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0,e0,l0.width,l0.height,0,v0,b0,l0.data)}}}else{if(V0=O.mipmaps,f&&E0){if(V0.length>0)q0++;let J0=o0(F0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,q0,e0,J0.width,J0.height)}for(let J0=0;J0<6;J0++)if(P0){if(f){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,0,0,0,F0[J0].width,F0[J0].height,v0,b0,F0[J0].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,0,e0,F0[J0].width,F0[J0].height,0,v0,b0,F0[J0].data);for(let O0=0;O0<V0.length;O0++){let EJ=V0[O0].image[J0].image;if(f){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0+1,0,0,EJ.width,EJ.height,v0,b0,EJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0+1,e0,EJ.width,EJ.height,0,v0,b0,EJ.data)}}else{if(f){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,0,0,0,v0,b0,F0[J0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,0,e0,v0,b0,F0[J0]);for(let O0=0;O0<V0.length;O0++){let l0=V0[O0];if(f){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0+1,0,0,v0,b0,l0.image[J0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+J0,O0+1,e0,v0,b0,l0.image[J0])}}}if(q(O))A(J.TEXTURE_CUBE_MAP);if(U0.__version=e.version,O.onUpdate)O.onUpdate(O)}V.__version=O.version}function z0(V,O,j,d,e,U0){let N0=K.convert(j.format,j.colorSpace),c=K.convert(j.type),a=L(j.internalFormat,N0,c,j.normalized,j.colorSpace),L0=W.get(O),P0=W.get(j);if(P0.__renderTarget=O,!L0.__hasExternalTextures){let F0=Math.max(1,O.width>>U0),G0=Math.max(1,O.height>>U0);if(e===J.TEXTURE_3D||e===J.TEXTURE_2D_ARRAY)$.texImage3D(e,U0,a,F0,G0,O.depth,0,N0,c,null);else $.texImage2D(e,U0,a,F0,G0,0,N0,c,null)}if($.bindFramebuffer(J.FRAMEBUFFER,V),P(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,d,e,P0.__webglTexture,0,d0(O));else if(e===J.TEXTURE_2D||e>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&e<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,d,e,P0.__webglTexture,U0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function KJ(V,O,j){if(J.bindRenderbuffer(J.RENDERBUFFER,V),O.depthBuffer){let d=O.depthTexture,e=d&&d.isDepthTexture?d.type:null,U0=z(O.stencilBuffer,e),N0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(P(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,d0(O),U0,O.width,O.height);else if(j)J.renderbufferStorageMultisample(J.RENDERBUFFER,d0(O),U0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,U0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,N0,J.RENDERBUFFER,V)}else{let d=O.textures;for(let e=0;e<d.length;e++){let U0=d[e],N0=K.convert(U0.format,U0.colorSpace),c=K.convert(U0.type),a=L(U0.internalFormat,N0,c,U0.normalized,U0.colorSpace);if(P(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,d0(O),a,O.width,O.height);else if(j)J.renderbufferStorageMultisample(J.RENDERBUFFER,d0(O),a,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,a,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function t(V,O,j){let d=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,V),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let e=W.get(O.depthTexture);if(e.__renderTarget=O,!e.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(d){if(e.__webglInit===void 0)e.__webglInit=!0,O.depthTexture.addEventListener("dispose",_);if(e.__webglTexture===void 0){e.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,e.__webglTexture),u0(J.TEXTURE_CUBE_MAP,O.depthTexture);let L0=K.convert(O.depthTexture.format),P0=K.convert(O.depthTexture.type),F0;if(O.depthTexture.format===u9)F0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===c9)F0=J.DEPTH24_STENCIL8;for(let G0=0;G0<6;G0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,F0,O.width,O.height,0,L0,P0,null)}}else Z0(O.depthTexture,0);let U0=e.__webglTexture,N0=d0(O),c=d?J.TEXTURE_CUBE_MAP_POSITIVE_X+j:J.TEXTURE_2D,a=O.depthTexture.format===c9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===u9)if(P(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,a,c,U0,0,N0);else J.framebufferTexture2D(J.FRAMEBUFFER,a,c,U0,0);else if(O.depthTexture.format===c9)if(P(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,a,c,U0,0,N0);else J.framebufferTexture2D(J.FRAMEBUFFER,a,c,U0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $0(V){let O=W.get(V),j=V.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==V.depthTexture){let d=V.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(d){let e=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,d.removeEventListener("dispose",e)};d.addEventListener("dispose",e),O.__depthDisposeCallback=e}O.__boundDepthTexture=d}if(V.depthTexture&&!O.__autoAllocateDepthBuffer)if(j)for(let d=0;d<6;d++)t(O.__webglFramebuffer[d],V,d);else{let d=V.texture.mipmaps;if(d&&d.length>0)t(O.__webglFramebuffer[0],V,0);else t(O.__webglFramebuffer,V,0)}else if(j){O.__webglDepthbuffer=[];for(let d=0;d<6;d++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[d]),O.__webglDepthbuffer[d]===void 0)O.__webglDepthbuffer[d]=J.createRenderbuffer(),KJ(O.__webglDepthbuffer[d],V,!1);else{let e=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=O.__webglDepthbuffer[d];J.bindRenderbuffer(J.RENDERBUFFER,U0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,U0)}}else{let d=V.texture.mipmaps;if(d&&d.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),KJ(O.__webglDepthbuffer,V,!1);else{let e=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,U0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,U0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function K0(V,O,j){let d=W.get(V);if(O!==void 0)z0(d.__webglFramebuffer,V,V.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(j!==void 0)$0(V)}function X0(V){let O=V.texture,j=W.get(V),d=W.get(O);V.addEventListener("dispose",M);let e=V.textures,U0=V.isWebGLCubeRenderTarget===!0,N0=e.length>1;if(!N0){if(d.__webglTexture===void 0)d.__webglTexture=J.createTexture();d.__version=O.version,H.memory.textures++}if(U0){j.__webglFramebuffer=[];for(let c=0;c<6;c++)if(O.mipmaps&&O.mipmaps.length>0){j.__webglFramebuffer[c]=[];for(let a=0;a<O.mipmaps.length;a++)j.__webglFramebuffer[c][a]=J.createFramebuffer()}else j.__webglFramebuffer[c]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){j.__webglFramebuffer=[];for(let c=0;c<O.mipmaps.length;c++)j.__webglFramebuffer[c]=J.createFramebuffer()}else j.__webglFramebuffer=J.createFramebuffer();if(N0)for(let c=0,a=e.length;c<a;c++){let L0=W.get(e[c]);if(L0.__webglTexture===void 0)L0.__webglTexture=J.createTexture(),H.memory.textures++}if(V.samples>0&&P(V)===!1){j.__webglMultisampledFramebuffer=J.createFramebuffer(),j.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let c=0;c<e.length;c++){let a=e[c];j.__webglColorRenderbuffer[c]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,j.__webglColorRenderbuffer[c]);let L0=K.convert(a.format,a.colorSpace),P0=K.convert(a.type),F0=L(a.internalFormat,L0,P0,a.normalized,a.colorSpace,V.isXRRenderTarget===!0),G0=d0(V);J.renderbufferStorageMultisample(J.RENDERBUFFER,G0,F0,V.width,V.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+c,J.RENDERBUFFER,j.__webglColorRenderbuffer[c])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),V.depthBuffer)j.__webglDepthRenderbuffer=J.createRenderbuffer(),KJ(j.__webglDepthRenderbuffer,V,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(U0){$.bindTexture(J.TEXTURE_CUBE_MAP,d.__webglTexture),u0(J.TEXTURE_CUBE_MAP,O);for(let c=0;c<6;c++)if(O.mipmaps&&O.mipmaps.length>0)for(let a=0;a<O.mipmaps.length;a++)z0(j.__webglFramebuffer[c][a],V,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+c,a);else z0(j.__webglFramebuffer[c],V,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+c,0);if(q(O))A(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(N0){for(let c=0,a=e.length;c<a;c++){let L0=e[c],P0=W.get(L0),F0=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)F0=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(F0,P0.__webglTexture),u0(F0,L0),z0(j.__webglFramebuffer,V,L0,J.COLOR_ATTACHMENT0+c,F0,0),q(L0))A(F0)}$.unbindTexture()}else{let c=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)c=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(c,d.__webglTexture),u0(c,O),O.mipmaps&&O.mipmaps.length>0)for(let a=0;a<O.mipmaps.length;a++)z0(j.__webglFramebuffer[a],V,O,J.COLOR_ATTACHMENT0,c,a);else z0(j.__webglFramebuffer,V,O,J.COLOR_ATTACHMENT0,c,0);if(q(O))A(c);$.unbindTexture()}if(V.depthBuffer)$0(V)}function M0(V){let O=V.textures;for(let j=0,d=O.length;j<d;j++){let e=O[j];if(q(e)){let U0=C(V),N0=W.get(e).__webglTexture;$.bindTexture(U0,N0),A(U0),$.unbindTexture()}}}let _0=[],y0=[];function p0(V){if(V.samples>0){if(P(V)===!1){let{textures:O,width:j,height:d}=V,e=J.COLOR_BUFFER_BIT,U0=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,N0=W.get(V),c=O.length>1;if(c)for(let L0=0;L0<O.length;L0++)$.bindFramebuffer(J.FRAMEBUFFER,N0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+L0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,N0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+L0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,N0.__webglMultisampledFramebuffer);let a=V.texture.mipmaps;if(a&&a.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,N0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,N0.__webglFramebuffer);for(let L0=0;L0<O.length;L0++){if(V.resolveDepthBuffer){if(V.depthBuffer)e|=J.DEPTH_BUFFER_BIT;if(V.stencilBuffer&&V.resolveStencilBuffer)e|=J.STENCIL_BUFFER_BIT}if(c){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,N0.__webglColorRenderbuffer[L0]);let P0=W.get(O[L0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,P0,0)}if(J.blitFramebuffer(0,0,j,d,0,0,j,d,e,J.NEAREST),X===!0){if(_0.length=0,y0.length=0,_0.push(J.COLOR_ATTACHMENT0+L0),V.depthBuffer&&V.storeMultisampledDepthBuffer===!1)_0.push(U0),y0.push(U0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,y0);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,_0)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),c)for(let L0=0;L0<O.length;L0++){$.bindFramebuffer(J.FRAMEBUFFER,N0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+L0,J.RENDERBUFFER,N0.__webglColorRenderbuffer[L0]);let P0=W.get(O[L0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,N0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+L0,J.TEXTURE_2D,P0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,N0.__webglMultisampledFramebuffer)}else if(V.depthBuffer&&V.storeMultisampledDepthBuffer===!1&&X){let O=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function d0(V){return Math.min(Z.maxSamples,V.samples)}function P(V){let O=W.get(V);return V.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function XJ(V){let O=H.render.frame;if(N.get(V)!==O)N.set(V,O),V.update()}function i0(V,O){let{colorSpace:j,format:d,type:e}=V;if(V.isCompressedTexture===!0||V.isVideoTexture===!0)return O;if(j!==X$&&j!==s9)if(r0.getTransfer(j)===NJ){if(d!==U9||e!==rJ)f0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else x0("WebGLTextures: Unsupported texture color space:",j);return O}function o0(V){if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement)U.width=V.naturalWidth||V.width,U.height=V.naturalHeight||V.height;else if(typeof VideoFrame<"u"&&V instanceof VideoFrame)U.width=V.displayWidth,U.height=V.displayHeight;else U.width=V.width,U.height=V.height;return U}this.allocateTextureUnit=o,this.resetTextureUnits=i,this.getTextureUnits=T,this.setTextureUnits=p,this.setTexture2D=Z0,this.setTexture2DArray=u,this.setTexture3D=r,this.setTextureCube=Q0,this.rebindTextures=K0,this.setupRenderTarget=X0,this.updateRenderTargetMipmap=M0,this.updateMultisampleRenderTarget=p0,this.setupDepthRenderbuffer=$0,this.setupFrameBufferTexture=z0,this.useMultisampledRTT=P,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function L5(J,Q){function $(W,Z=s9){let K,H=r0.getTransfer(Z);if(W===rJ)return J.UNSIGNED_BYTE;if(W===CQ)return J.UNSIGNED_SHORT_4_4_4_4;if(W===wQ)return J.UNSIGNED_SHORT_5_5_5_1;if(W===dZ)return J.UNSIGNED_INT_5_9_9_9_REV;if(W===lZ)return J.UNSIGNED_INT_10F_11F_11F_REV;if(W===pZ)return J.BYTE;if(W===mZ)return J.SHORT;if(W===Y7)return J.UNSIGNED_SHORT;if(W===AQ)return J.INT;if(W===j9)return J.UNSIGNED_INT;if(W===k9)return J.FLOAT;if(W===X9)return J.HALF_FLOAT;if(W===uZ)return J.ALPHA;if(W===cZ)return J.RGB;if(W===U9)return J.RGBA;if(W===u9)return J.DEPTH_COMPONENT;if(W===c9)return J.DEPTH_STENCIL;if(W===nZ)return J.RED;if(W===_Q)return J.RED_INTEGER;if(W===n9)return J.RG;if(W===PQ)return J.RG_INTEGER;if(W===TQ)return J.RGBA_INTEGER;if(W===Z6||W===K6||W===H6||W===Y6)if(H===NJ)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(W===Z6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===K6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===H6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===Y6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(W===Z6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===K6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===H6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===Y6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===SQ||W===jQ||W===yQ||W===vQ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(W===SQ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===jQ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===yQ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===vQ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===fQ||W===hQ||W===bQ||W===xQ||W===gQ||W===X6||W===pQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(W===fQ||W===hQ)return H===NJ?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(W===bQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(W===xQ)return K.COMPRESSED_R11_EAC;if(W===gQ)return K.COMPRESSED_SIGNED_R11_EAC;if(W===X6)return K.COMPRESSED_RG11_EAC;if(W===pQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(W===mQ||W===dQ||W===lQ||W===uQ||W===cQ||W===nQ||W===sQ||W===iQ||W===oQ||W===aQ||W===rQ||W===tQ||W===eQ||W===J$)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(W===mQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===dQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===lQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===uQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===cQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===nQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===sQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===iQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===oQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===aQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===rQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===tQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===eQ)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===J$)return H===NJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===Q$||W===$$||W===W$)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(W===Q$)return H===NJ?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===$$)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===W$)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===Z$||W===K$||W===U6||W===H$)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(W===Z$)return K.COMPRESSED_RED_RGTC1_EXT;if(W===K$)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===U6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===H$)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===P8)return J.UNSIGNED_INT_24_8;return J[W]!==void 0?J[W]:null}return{convert:$}}var V5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B5=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class KH{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new L6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new uJ({vertexShader:V5,fragmentShader:B5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new kJ(new F7(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class HH extends L9{constructor(J,Q){super();let $=this,W=null,Z=1,K=null,H="local-floor",Y=1,X=null,U=null,N=null,E=null,G=null,D=null,R=typeof XRWebGLBinding<"u",B=new KH,F={},q=Q.getContextAttributes(),A=null,C=null,L=[],z=[],w=new Y0,_=null,M=null,I=new vJ;I.viewport=new DJ;let g=new vJ;g.viewport=new DJ;let v=[I,g],h=new i$,i=null,T=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(n){let H0=L[n];if(H0===void 0)H0=new G7,L[n]=H0;return H0.getTargetRaySpace()},this.getControllerGrip=function(n){let H0=L[n];if(H0===void 0)H0=new G7,L[n]=H0;return H0.getGripSpace()},this.getHand=function(n){let H0=L[n];if(H0===void 0)H0=new G7,L[n]=H0;return H0.getHandSpace()};function p(n){let H0=z.indexOf(n.inputSource);if(H0===-1)return;let W0=L[H0];if(W0!==void 0)W0.update(n.inputSource,n.frame,X||K),W0.dispatchEvent({type:n.type,data:n.inputSource})}function o(){W.removeEventListener("select",p),W.removeEventListener("selectstart",p),W.removeEventListener("selectend",p),W.removeEventListener("squeeze",p),W.removeEventListener("squeezestart",p),W.removeEventListener("squeezeend",p),W.removeEventListener("end",o),W.removeEventListener("inputsourceschange",m);for(let n=0;n<L.length;n++){let H0=z[n];if(H0===null)continue;z[n]=null,L[n].disconnect(H0)}i=null,T=null,B.reset();for(let n in F)delete F[n];if(J.setRenderTarget(A),G=null,E=null,N=null,W=null,C=null,u0.stop(),$.isPresenting=!1,J.setPixelRatio(_),J.setSize(w.width,w.height,!1),M!==null){let n=M.camera;n.fov=M.fov,n.zoom=M.zoom,n.updateProjectionMatrix(),M=null}$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(n){if(Z=n,$.isPresenting===!0)f0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(n){if(H=n,$.isPresenting===!0)f0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(n){X=n},this.getBaseLayer=function(){return E!==null?E:G},this.getBinding=function(){if(N===null&&R)N=new XRWebGLBinding(W,Q);return N},this.getFrame=function(){return D},this.getSession=function(){return W},this.setSession=async function(n){if(W=n,W!==null){if(A=J.getRenderTarget(),W.addEventListener("select",p),W.addEventListener("selectstart",p),W.addEventListener("selectend",p),W.addEventListener("squeeze",p),W.addEventListener("squeezestart",p),W.addEventListener("squeezeend",p),W.addEventListener("end",o),W.addEventListener("inputsourceschange",m),q.xrCompatible!==!0)await Q.makeXRCompatible();if(_=J.getPixelRatio(),J.getSize(w),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let W0={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:Z};G=new XRWebGLLayer(W,Q,W0),W.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),C=new pJ(G.framebufferWidth,G.framebufferHeight,{format:U9,type:rJ,colorSpace:J.outputColorSpace,stencilBuffer:q.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1,storeMultisampledDepthBuffer:G.ignoreDepthValues===!1,storeMultisampledStencilBuffer:G.ignoreDepthValues===!1})}else{let W0=null,j0=null,h0=null;if(q.depth)h0=q.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,W0=q.stencil?c9:u9,j0=q.stencil?P8:j9;let z0={colorFormat:Q.RGBA8,depthFormat:h0,scaleFactor:Z};N=this.getBinding(),E=N.createProjectionLayer(z0),W.updateRenderState({layers:[E]}),J.setPixelRatio(1),J.setSize(E.textureWidth,E.textureHeight,!1),C=new pJ(E.textureWidth,E.textureHeight,{format:U9,type:rJ,depthTexture:new i9(E.textureWidth,E.textureHeight,j0,void 0,void 0,void 0,void 0,void 0,void 0,W0),stencilBuffer:q.stencil,colorSpace:J.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1,storeMultisampledDepthBuffer:E.ignoreDepthValues===!1,storeMultisampledStencilBuffer:E.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await W.requestReferenceSpace(H),u0.setContext(W),u0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(W!==null)return W.environmentBlendMode},this.getDepthTexture=function(){return B.getDepthTexture()};function m(n){for(let H0=0;H0<n.removed.length;H0++){let W0=n.removed[H0],j0=z.indexOf(W0);if(j0>=0)z[j0]=null,L[j0].disconnect(W0)}for(let H0=0;H0<n.added.length;H0++){let W0=n.added[H0],j0=z.indexOf(W0);if(j0===-1){for(let z0=0;z0<L.length;z0++)if(z0>=z.length){z.push(W0),j0=z0;break}else if(z[z0]===null){z[z0]=W0,j0=z0;break}if(j0===-1)break}let h0=L[j0];if(h0)h0.connect(W0)}}let Z0=new S,u=new S;function r(n,H0,W0){Z0.setFromMatrixPosition(H0.matrixWorld),u.setFromMatrixPosition(W0.matrixWorld);let j0=Z0.distanceTo(u),h0=H0.projectionMatrix.elements,z0=W0.projectionMatrix.elements,KJ=h0[14]/(h0[10]-1),t=h0[14]/(h0[10]+1),$0=(h0[9]+1)/h0[5],K0=(h0[9]-1)/h0[5],X0=(h0[8]-1)/h0[0],M0=(z0[8]+1)/z0[0],_0=KJ*X0,y0=KJ*M0,p0=j0/(-X0+M0),d0=p0*-X0;if(H0.matrixWorld.decompose(n.position,n.quaternion,n.scale),n.translateX(d0),n.translateZ(p0),n.matrixWorld.compose(n.position,n.quaternion,n.scale),n.matrixWorldInverse.copy(n.matrixWorld).invert(),h0[10]===-1)n.projectionMatrix.copy(H0.projectionMatrix),n.projectionMatrixInverse.copy(H0.projectionMatrixInverse);else{let P=KJ+p0,XJ=t+p0,i0=_0-d0,o0=y0+(j0-d0),V=$0*t/XJ*P,O=K0*t/XJ*P;n.projectionMatrix.makePerspective(i0,o0,V,O,P,XJ),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}}function Q0(n,H0){if(H0===null)n.matrixWorld.copy(n.matrix);else n.matrixWorld.multiplyMatrices(H0.matrixWorld,n.matrix);n.matrixWorldInverse.copy(n.matrixWorld).invert()}this.updateCamera=function(n){if(W===null)return;let{near:H0,far:W0}=n;if(B.texture!==null){if(B.depthNear>0)H0=B.depthNear;if(B.depthFar>0)W0=B.depthFar}if(h.near=g.near=I.near=H0,h.far=g.far=I.far=W0,i!==h.near||T!==h.far)W.updateRenderState({depthNear:h.near,depthFar:h.far}),i=h.near,T=h.far;h.layers.mask=n.layers.mask|6,I.layers.mask=h.layers.mask&-5,g.layers.mask=h.layers.mask&-3;let j0=n.parent,h0=h.cameras;Q0(h,j0);for(let z0=0;z0<h0.length;z0++)Q0(h0[z0],j0);if(h0.length===2)r(h,I,g);else h.projectionMatrix.copy(I.projectionMatrix);if(M===null&&n.isPerspectiveCamera)M={camera:n,fov:n.fov,zoom:n.zoom};T0(n,h,j0)};function T0(n,H0,W0){if(W0===null)n.matrix.copy(H0.matrixWorld);else n.matrix.copy(W0.matrixWorld),n.matrix.invert(),n.matrix.multiply(H0.matrixWorld);if(n.matrix.decompose(n.position,n.quaternion,n.scale),n.updateMatrixWorld(!0),n.projectionMatrix.copy(H0.projectionMatrix),n.projectionMatrixInverse.copy(H0.projectionMatrixInverse),n.isPerspectiveCamera)n.fov=I8*2*Math.atan(1/n.projectionMatrix.elements[5]),n.zoom=1}this.getCamera=function(){return h},this.getFoveation=function(){if(E===null&&G===null)return;return Y},this.setFoveation=function(n){if(Y=n,E!==null)E.fixedFoveation=n;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=n},this.hasDepthSensing=function(){return B.texture!==null},this.getDepthSensingMesh=function(){return B.getMesh(h)},this.getCameraTexture=function(n){return F[n]};let S0=null;function ZJ(n,H0){if(U=H0.getViewerPose(X||K),D=H0,U!==null){let W0=U.views;if(G!==null)J.setRenderTargetFramebuffer(C,G.framebuffer),J.setRenderTarget(C);let j0=!1;if(W0.length!==h.cameras.length)h.cameras.length=0,j0=!0;for(let t=0;t<W0.length;t++){let $0=W0[t],K0=null;if(G!==null)K0=G.getViewport($0);else{let M0=N.getViewSubImage(E,$0);if(K0=M0.viewport,t===0)J.setRenderTargetTextures(C,M0.colorTexture,M0.depthStencilTexture),J.setRenderTarget(C)}let X0=v[t];if(X0===void 0)X0=new vJ,X0.layers.enable(t),X0.viewport=new DJ,v[t]=X0;if(X0.matrix.fromArray($0.transform.matrix),X0.matrix.decompose(X0.position,X0.quaternion,X0.scale),X0.projectionMatrix.fromArray($0.projectionMatrix),X0.projectionMatrixInverse.copy(X0.projectionMatrix).invert(),X0.viewport.set(K0.x,K0.y,K0.width,K0.height),t===0)h.matrix.copy(X0.matrix),h.matrix.decompose(h.position,h.quaternion,h.scale);if(j0===!0)h.cameras.push(X0)}let h0=W.enabledFeatures;if(h0&&h0.includes("depth-sensing")&&W.depthUsage=="gpu-optimized"&&R){N=$.getBinding();let t=N.getDepthInformation(W0[0]);if(t&&t.isValid&&t.texture)B.init(t,W.renderState)}if(h0&&h0.includes("camera-access")&&R){J.state.unbindTexture(),N=$.getBinding();for(let t=0;t<W0.length;t++){let $0=W0[t].camera;if($0){let K0=F[$0];if(!K0)K0=new L6,F[$0]=K0;let X0=N.getCameraImage($0);K0.sourceTexture=X0}}}}for(let W0=0;W0<L.length;W0++){let j0=z[W0],h0=L[W0];if(j0!==null&&h0!==void 0)h0.update(j0,H0,X||K)}if(S0)S0(n,H0);if(H0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:H0});D=null}let u0=new iK;u0.setAnimationLoop(ZJ),this.setAnimationLoop=function(n){S0=n},this.dispose=function(){}}}var I5=new JJ,YH=new g0;YH.set(-1,0,0,0,1,0,0,0,1);function z5(J,Q){function $(F,q){if(F.matrixAutoUpdate===!0)F.updateMatrix();q.value.copy(F.matrix)}function W(F,q){if(q.color.getRGB(F.fogColor.value,y$(J)),q.isFog)F.fogNear.value=q.near,F.fogFar.value=q.far;else if(q.isFogExp2)F.fogDensity.value=q.density}function Z(F,q,A,C,L){if(q.isNodeMaterial)q.uniformsNeedUpdate=!1;else if(q.isMeshBasicMaterial)K(F,q);else if(q.isMeshLambertMaterial){if(K(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshToonMaterial)K(F,q),E(F,q);else if(q.isMeshPhongMaterial){if(K(F,q),N(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshStandardMaterial){if(K(F,q),G(F,q),q.isMeshPhysicalMaterial)D(F,q,L)}else if(q.isMeshMatcapMaterial)K(F,q),R(F,q);else if(q.isMeshDepthMaterial)K(F,q);else if(q.isMeshDistanceMaterial)K(F,q),B(F,q);else if(q.isMeshNormalMaterial)K(F,q);else if(q.isLineBasicMaterial){if(H(F,q),q.isLineDashedMaterial)Y(F,q)}else if(q.isPointsMaterial)X(F,q,A,C);else if(q.isSpriteMaterial)U(F,q);else if(q.isShadowMaterial)F.color.value.copy(q.color),F.opacity.value=q.opacity;else if(q.isShaderMaterial)q.uniformsNeedUpdate=!1}function K(F,q){if(F.opacity.value=q.opacity,q.color)F.diffuse.value.copy(q.color);if(q.emissive)F.emissive.value.copy(q.emissive).multiplyScalar(q.emissiveIntensity);if(q.map)F.map.value=q.map,$(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.bumpMap){if(F.bumpMap.value=q.bumpMap,$(q.bumpMap,F.bumpMapTransform),F.bumpScale.value=q.bumpScale,q.side===TJ)F.bumpScale.value*=-1}if(q.normalMap){if(F.normalMap.value=q.normalMap,$(q.normalMap,F.normalMapTransform),F.normalScale.value.copy(q.normalScale),q.side===TJ)F.normalScale.value.negate()}if(q.displacementMap)F.displacementMap.value=q.displacementMap,$(q.displacementMap,F.displacementMapTransform),F.displacementScale.value=q.displacementScale,F.displacementBias.value=q.displacementBias;if(q.emissiveMap)F.emissiveMap.value=q.emissiveMap,$(q.emissiveMap,F.emissiveMapTransform);if(q.specularMap)F.specularMap.value=q.specularMap,$(q.specularMap,F.specularMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest;let A=Q.get(q),C=A.envMap,L=A.envMapRotation;if(C){if(F.envMap.value=C,F.envMapRotation.value.setFromMatrix4(I5.makeRotationFromEuler(L)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)F.envMapRotation.value.premultiply(YH);F.reflectivity.value=q.reflectivity,F.ior.value=q.ior,F.refractionRatio.value=q.refractionRatio}if(q.lightMap)F.lightMap.value=q.lightMap,F.lightMapIntensity.value=q.lightMapIntensity,$(q.lightMap,F.lightMapTransform);if(q.aoMap)F.aoMap.value=q.aoMap,F.aoMapIntensity.value=q.aoMapIntensity,$(q.aoMap,F.aoMapTransform)}function H(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,q.map)F.map.value=q.map,$(q.map,F.mapTransform)}function Y(F,q){F.dashSize.value=q.dashSize,F.totalSize.value=q.dashSize+q.gapSize,F.scale.value=q.scale}function X(F,q,A,C){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.size.value=q.size*A,F.scale.value=C*0.5,q.map)F.map.value=q.map,$(q.map,F.uvTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function U(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.rotation.value=q.rotation,q.map)F.map.value=q.map,$(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function N(F,q){F.specular.value.copy(q.specular),F.shininess.value=Math.max(q.shininess,0.0001)}function E(F,q){if(q.gradientMap)F.gradientMap.value=q.gradientMap}function G(F,q){if(F.metalness.value=q.metalness,q.metalnessMap)F.metalnessMap.value=q.metalnessMap,$(q.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=q.roughness,q.roughnessMap)F.roughnessMap.value=q.roughnessMap,$(q.roughnessMap,F.roughnessMapTransform);if(q.envMap)F.envMapIntensity.value=q.envMapIntensity}function D(F,q,A){if(F.ior.value=q.ior,q.sheen>0){if(F.sheenColor.value.copy(q.sheenColor).multiplyScalar(q.sheen),F.sheenRoughness.value=q.sheenRoughness,q.sheenColorMap)F.sheenColorMap.value=q.sheenColorMap,$(q.sheenColorMap,F.sheenColorMapTransform);if(q.sheenRoughnessMap)F.sheenRoughnessMap.value=q.sheenRoughnessMap,$(q.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(q.clearcoat>0){if(F.clearcoat.value=q.clearcoat,F.clearcoatRoughness.value=q.clearcoatRoughness,q.clearcoatMap)F.clearcoatMap.value=q.clearcoatMap,$(q.clearcoatMap,F.clearcoatMapTransform);if(q.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=q.clearcoatRoughnessMap,$(q.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(q.clearcoatNormalMap){if(F.clearcoatNormalMap.value=q.clearcoatNormalMap,$(q.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(q.clearcoatNormalScale),q.side===TJ)F.clearcoatNormalScale.value.negate()}}if(q.dispersion>0)F.dispersion.value=q.dispersion;if(q.retroreflectivity>0)F.retroreflectivity.value=q.retroreflectivity;if(q.iridescence>0){if(F.iridescence.value=q.iridescence,F.iridescenceIOR.value=q.iridescenceIOR,F.iridescenceThicknessMinimum.value=q.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=q.iridescenceThicknessRange[1],q.iridescenceMap)F.iridescenceMap.value=q.iridescenceMap,$(q.iridescenceMap,F.iridescenceMapTransform);if(q.iridescenceThicknessMap)F.iridescenceThicknessMap.value=q.iridescenceThicknessMap,$(q.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(q.transmission>0){if(F.transmission.value=q.transmission,F.transmissionSamplerMap.value=A.texture,F.transmissionSamplerSize.value.set(A.width,A.height),q.transmissionMap)F.transmissionMap.value=q.transmissionMap,$(q.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=q.thickness,q.thicknessMap)F.thicknessMap.value=q.thicknessMap,$(q.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=q.attenuationDistance,F.attenuationColor.value.copy(q.attenuationColor)}if(q.anisotropy>0){if(F.anisotropyVector.value.set(q.anisotropy*Math.cos(q.anisotropyRotation),q.anisotropy*Math.sin(q.anisotropyRotation)),q.anisotropyMap)F.anisotropyMap.value=q.anisotropyMap,$(q.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=q.specularIntensity,F.specularColor.value.copy(q.specularColor),q.specularColorMap)F.specularColorMap.value=q.specularColorMap,$(q.specularColorMap,F.specularColorMapTransform);if(q.specularIntensityMap)F.specularIntensityMap.value=q.specularIntensityMap,$(q.specularIntensityMap,F.specularIntensityMapTransform)}function R(F,q){if(q.matcap)F.matcap.value=q.matcap}function B(F,q){let A=Q.get(q).light;F.referencePosition.value.setFromMatrixPosition(A.matrixWorld),F.nearDistance.value=A.shadow.camera.near,F.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:W,refreshMaterialUniforms:Z}}function A5(J,Q,$,W){let Z={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(L,z){let w=z.program;W.uniformBlockBinding(L,w)}function U(L,z){let w=Z[L.id];if(w===void 0)F(L),w=N(L),Z[L.id]=w,L.addEventListener("dispose",A);let _=z.program;W.updateUBOMapping(L,_);let M=Q.render.frame;if(K[L.id]!==M)G(L),K[L.id]=M}function N(L){let z=E();L.__bindingPointIndex=z;let w=J.createBuffer(),_=L.__size,M=L.usage;return J.bindBuffer(J.UNIFORM_BUFFER,w),J.bufferData(J.UNIFORM_BUFFER,_,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,z,w),w}function E(){for(let L=0;L<Y;L++)if(H.indexOf(L)===-1)return H.push(L),L;return x0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(L){let z=Z[L.id],w=L.uniforms,_=L.__cache;J.bindBuffer(J.UNIFORM_BUFFER,z);for(let M=0,I=w.length;M<I;M++){let g=w[M];if(Array.isArray(g))for(let v=0,h=g.length;v<h;v++)D(g[v],M,v,_);else D(g,M,0,_)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(L,z,w,_){if(B(L,z,w,_)===!0){let{__offset:M,value:I}=L;if(Array.isArray(I)){let g=0;for(let v=0;v<I.length;v++){let h=I[v],i=q(h);if(R(h,L.__data,g),typeof h!=="number"&&typeof h!=="boolean"&&!h.isMatrix3&&!ArrayBuffer.isView(h))g+=i.storage/Float32Array.BYTES_PER_ELEMENT}}else R(I,L.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,L.__data)}}function R(L,z,w){if(typeof L==="number"||typeof L==="boolean")z[0]=L;else if(L.isMatrix3)z[0]=L.elements[0],z[1]=L.elements[1],z[2]=L.elements[2],z[3]=0,z[4]=L.elements[3],z[5]=L.elements[4],z[6]=L.elements[5],z[7]=0,z[8]=L.elements[6],z[9]=L.elements[7],z[10]=L.elements[8],z[11]=0;else if(ArrayBuffer.isView(L))z.set(new L.constructor(L.buffer,L.byteOffset,z.length));else L.toArray(z,w)}function B(L,z,w,_){let M=L.value,I=z+"_"+w;if(_[I]===void 0){if(typeof M==="number"||typeof M==="boolean")_[I]=M;else if(ArrayBuffer.isView(M))_[I]=M.slice();else _[I]=M.clone();return!0}else{let g=_[I];if(typeof M==="number"||typeof M==="boolean"){if(g!==M)return _[I]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(g.equals(M)===!1)return g.copy(M),!0}return!1}function F(L){let z=L.uniforms,w=0,_=16;for(let I=0,g=z.length;I<g;I++){let v=Array.isArray(z[I])?z[I]:[z[I]];for(let h=0,i=v.length;h<i;h++){let T=v[h],p=Array.isArray(T.value)?T.value:[T.value];for(let o=0,m=p.length;o<m;o++){let Z0=p[o],u=q(Z0),r=w%_,Q0=r%u.boundary,T0=r+Q0;if(w+=Q0,T0!==0&&_-T0<u.storage)w+=_-T0;T.__data=new Float32Array(u.storage/Float32Array.BYTES_PER_ELEMENT),T.__offset=w,w+=u.storage}}}let M=w%_;if(M>0)w+=_-M;return L.__size=w,L.__cache={},this}function q(L){let z={boundary:0,storage:0};if(typeof L==="number"||typeof L==="boolean")z.boundary=4,z.storage=4;else if(L.isVector2)z.boundary=8,z.storage=8;else if(L.isVector3||L.isColor)z.boundary=16,z.storage=12;else if(L.isVector4)z.boundary=16,z.storage=16;else if(L.isMatrix3)z.boundary=48,z.storage=48;else if(L.isMatrix4)z.boundary=64,z.storage=64;else if(L.isTexture)f0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(L))z.boundary=16,z.storage=L.byteLength;else f0("WebGLRenderer: Unsupported uniform value type.",L);return z}function A(L){let z=L.target;z.removeEventListener("dispose",A);let w=H.indexOf(z.__bindingPointIndex);H.splice(w,1),J.deleteBuffer(Z[z.id]),delete Z[z.id],delete K[z.id]}function C(){for(let L in Z)J.deleteBuffer(Z[L]);H=[],Z={},K={}}return{bind:X,update:U,dispose:C}}var C5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),G9=null;function w5(){if(G9===null)G9=new R6(C5,16,16,n9,X9),G9.name="DFG_LUT",G9.minFilter=fJ,G9.magFilter=fJ,G9.wrapS=$6,G9.wrapT=$6,G9.generateMipmaps=!1,G9.needsUpdate=!0;return G9}class _5{constructor(J={}){let{canvas:Q=QK(),context:$=null,depth:W=!0,stencil:Z=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:E=!1,outputBufferType:G=rJ}=J;this.isWebGLRenderer=!0;let D;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=$.getContextAttributes().alpha}else D=K;let R=G,B=new Set([TQ,PQ,_Q]),F=new Set([rJ,j9,Y7,P8,CQ,wQ]),q=new Uint32Array(4),A=new Int32Array(4),C=new S,L=null,z=null,w=[],_=[],M=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=aJ,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,g=!1,v=null,h=null,i=null,T=null;this._outputColorSpace=iZ;let p=0,o=0,m=null,Z0=-1,u=null,r=new DJ,Q0=new DJ,T0=null,S0=new m0(0),ZJ=0,u0=Q.width,n=Q.height,H0=1,W0=null,j0=null,h0=new DJ(0,0,u0,n),z0=new DJ(0,0,u0,n),KJ=!1,t=new E7,$0=!1,K0=!1,X0=new JJ,M0=new S,_0=new DJ,y0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},p0=!1;function d0(){return m===null?H0:1}let P=$;function XJ(k,y){return Q.getContext(k,y)}let i0,o0,V,O,j,d,e,U0,N0,c,a,L0,P0,F0,G0,v0,b0,e0,f,E0,s,q0,V0;try{let k={alpha:!0,depth:W,stencil:Z,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${WZ}`);if(Q.addEventListener("webglcontextlost",l0,!1),Q.addEventListener("webglcontextrestored",EJ,!1),Q.addEventListener("webglcontextcreationerror",QJ,!1),P===null){if(P=XJ("webgl2",k),P===null)if(XJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}J0()}catch(k){throw Q.removeEventListener("webglcontextlost",l0,!1),Q.removeEventListener("webglcontextrestored",EJ,!1),Q.removeEventListener("webglcontextcreationerror",QJ,!1),x0("WebGLRenderer: "+k.message),k}function J0(){if(i0=new vG(P),i0.init(),s=new L5(P,i0),o0=new zG(P,i0,J,s),V=new M5(P,i0),o0.reversedDepthBuffer&&E)V.buffers.depth.setReversed(!0);h=P.createFramebuffer(),i=P.createFramebuffer(),T=P.createFramebuffer(),O=new bG(P),j=new Z5,d=new k5(P,i0,V,j,o0,s,O),e=new yG(I),U0=new gY(P),q0=new BG(P,U0),N0=new fG(P,U0,O,q0),c=new gG(P,N0,U0,q0,O),e0=new xG(P,o0,d),G0=new AG(j),a=new W5(I,e,i0,o0,q0,G0),L0=new z5(I,j),P0=new H5,F0=new E5(i0),b0=new VG(I,e,V,c,D,Y),v0=new R5(I,c,o0),V0=new A5(P,O,o0,V),f=new IG(P,i0,O),E0=new hG(P,i0,O),O.programs=a.programs,I.capabilities=o0,I.extensions=i0,I.properties=j,I.renderLists=P0,I.shadowMap=v0,I.state=V,I.info=O}if(R!==rJ)M=new mG(R,Q.width,Q.height,H,W,Z);let O0=new HH(I,P);this.xr=O0,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let k=i0.get("WEBGL_lose_context");if(k)k.loseContext()},this.forceContextRestore=function(){let k=i0.get("WEBGL_lose_context");if(k)k.restoreContext()},this.getPixelRatio=function(){return H0},this.setPixelRatio=function(k){if(k===void 0)return;H0=k,this.setSize(u0,n,!1)},this.getSize=function(k){return k.set(u0,n)},this.setSize=function(k,y,l=!0){if(O0.isPresenting){f0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(u0=k,n=y,Q.width=Math.floor(k*H0),Q.height=Math.floor(y*H0),l===!0)Q.style.width=k+"px",Q.style.height=y+"px";if(M!==null)M.setSize(Q.width,Q.height);this.setViewport(0,0,k,y)},this.getDrawingBufferSize=function(k){return k.set(u0*H0,n*H0).floor()},this.setDrawingBufferSize=function(k,y,l){u0=k,n=y,H0=l,Q.width=Math.floor(k*l),Q.height=Math.floor(y*l),this.setViewport(0,0,k,y)},this.setEffects=function(k){if(R===rJ){x0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let y=0;y<k.length;y++)if(k[y].isOutputPass===!0){f0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(r)},this.getViewport=function(k){return k.copy(h0)},this.setViewport=function(k,y,l,b){if(k.isVector4)h0.set(k.x,k.y,k.z,k.w);else h0.set(k,y,l,b);V.viewport(r.copy(h0).multiplyScalar(H0).round())},this.getScissor=function(k){return k.copy(z0)},this.setScissor=function(k,y,l,b){if(k.isVector4)z0.set(k.x,k.y,k.z,k.w);else z0.set(k,y,l,b);V.scissor(Q0.copy(z0).multiplyScalar(H0).round())},this.getScissorTest=function(){return KJ},this.setScissorTest=function(k){V.setScissorTest(KJ=k)},this.setOpaqueSort=function(k){W0=k},this.setTransparentSort=function(k){j0=k},this.getClearColor=function(k){return k.copy(b0.getClearColor())},this.setClearColor=function(){b0.setClearColor(...arguments)},this.getClearAlpha=function(){return b0.getClearAlpha()},this.setClearAlpha=function(){b0.setClearAlpha(...arguments)},this.clear=function(k=!0,y=!0,l=!0){let b=0;if(k){let x=!1;if(m!==null){let k0=m.texture.format;x=B.has(k0)}if(x){let k0=m.texture.type,I0=F.has(k0),R0=b0.getClearColor(),A0=b0.getClearAlpha(),w0=R0.r,c0=R0.g,a0=R0.b;if(I0)q[0]=w0,q[1]=c0,q[2]=a0,q[3]=A0,P.clearBufferuiv(P.COLOR,0,q);else A[0]=w0,A[1]=c0,A[2]=a0,A[3]=A0,P.clearBufferiv(P.COLOR,0,A)}else b|=P.COLOR_BUFFER_BIT}if(y)b|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(l)b|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(b!==0)P.clear(b)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),v=k},this.dispose=function(){Q.removeEventListener("webglcontextlost",l0,!1),Q.removeEventListener("webglcontextrestored",EJ,!1),Q.removeEventListener("webglcontextcreationerror",QJ,!1),b0.dispose(),P0.dispose(),F0.dispose(),j.dispose(),e.dispose(),c.dispose(),q0.dispose(),V0.dispose(),a.dispose(),O0.dispose(),O0.removeEventListener("sessionstart",GW),O0.removeEventListener("sessionend",NW),f9.stop()};function l0(k){k.preventDefault(),t8("WebGLRenderer: Context Lost."),g=!0}function EJ(){t8("WebGLRenderer: Context Restored."),g=!1;let k=O.autoReset,y=v0.enabled,l=v0.autoUpdate,b=v0.needsUpdate,x=v0.type;J0(),O.autoReset=k,v0.enabled=y,v0.autoUpdate=l,v0.needsUpdate=b,v0.type=x}function QJ(k){x0("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function eJ(k){let y=k.target;y.removeEventListener("dispose",eJ),E9(y)}function E9(k){XH(k),j.remove(k)}function XH(k){let y=j.get(k).programs;if(y!==void 0){if(y.forEach(function(l){a.releaseProgram(l)}),k.isShaderMaterial)a.releaseShaderCache(k)}}this.renderBufferDirect=function(k,y,l,b,x,k0){if(y===null)y=y0;let I0=x.isMesh&&x.matrixWorld.determinantAffine()<0,R0=NH(k,y,l,b,x);V.setMaterial(b,I0);let A0=l.index,w0=1;if(b.wireframe===!0){if(A0=N0.getWireframeAttribute(l),A0===void 0)return;w0=2}let c0=l.drawRange,a0=l.attributes.position,C0=c0.start*w0,$J=(c0.start+c0.count)*w0;if(k0!==null)C0=Math.max(C0,k0.start*w0),$J=Math.min($J,(k0.start+k0.count)*w0);if(A0!==null)C0=Math.max(C0,0),$J=Math.min($J,A0.count);else if(a0!==void 0&&a0!==null)C0=Math.max(C0,0),$J=Math.min($J,a0.count);let LJ=$J-C0;if(LJ<0||LJ===1/0)return;q0.setup(x,b,R0,l,A0);let FJ,GJ=f;if(A0!==null)FJ=U0.get(A0),GJ=E0,GJ.setIndex(FJ);if(x.isMesh)if(b.wireframe===!0)V.setLineWidth(b.wireframeLinewidth*d0()),GJ.setMode(P.LINES);else GJ.setMode(P.TRIANGLES);else if(x.isLine){let wJ=b.linewidth;if(wJ===void 0)wJ=1;if(V.setLineWidth(wJ*d0()),x.isLineSegments)GJ.setMode(P.LINES);else if(x.isLineLoop)GJ.setMode(P.LINE_LOOP);else GJ.setMode(P.LINE_STRIP)}else if(x.isPoints)GJ.setMode(P.POINTS);else if(x.isSprite)GJ.setMode(P.TRIANGLES);if(x.isBatchedMesh)if(!i0.get("WEBGL_multi_draw")){let{_multiDrawStarts:wJ,_multiDrawCounts:B0,_multiDrawCount:jJ}=x,t0=A0?U0.get(A0).bytesPerElement:1,mJ=j.get(b).currentProgram.getUniforms();for(let J9=0;J9<jJ;J9++)mJ.setValue(P,"_gl_DrawID",J9),GJ.render(wJ[J9]/t0,B0[J9])}else GJ.renderMultiDraw(x._multiDrawStarts,x._multiDrawCounts,x._multiDrawCount);else if(x.isInstancedMesh)GJ.renderInstances(C0,LJ,x.count);else if(l.isInstancedBufferGeometry){let wJ=l._maxInstanceCount!==void 0?l._maxInstanceCount:1/0,B0=Math.min(l.instanceCount,wJ);GJ.renderInstances(C0,LJ,B0)}else GJ.render(C0,LJ)};function UW(k,y,l,b){if(v!==null&&k.isNodeMaterial)v.setObject(b,k);if($0===!0)G0.setState(k,l,!1);if(k.transparent===!0&&k.side===H9&&k.forceSinglePass===!1)k.side=TJ,k.needsUpdate=!0,V7(k,y,b),k.side=C8,k.needsUpdate=!0,V7(k,y,b),k.side=H9;else V7(k,y,b)}this.compile=function(k,y,l=null){if(l===null)l=k;if(v!==null)v.renderStart(k,y,l);if(z=F0.get(l),z.init(y),_.push(z),l.traverseVisible(function(x){if(x.isLight&&x.layers.test(y.layers)){if(z.pushLight(x),x.castShadow)z.pushShadow(x)}}),k!==l)k.traverseVisible(function(x){if(x.isLight&&x.layers.test(y.layers)){if(z.pushLight(x),x.castShadow)z.pushShadow(x)}});if(z.setupLights(),v!==null)v.updateLights(z.state.lightsArray);if(K0=this.localClippingEnabled,$0=G0.init(this.clippingPlanes,K0),$0===!0)G0.setGlobalState(this.clippingPlanes,y);if(v!==null)v0.render(z.state.shadowsArray,l,y);let b=new Set;if(k.traverse(function(x){if(!(x.isMesh||x.isPoints||x.isLine||x.isSprite))return;let k0=x.material;if(k0)if(Array.isArray(k0))for(let I0=0;I0<k0.length;I0++){let R0=k0[I0];UW(R0,l,y,x),b.add(R0)}else UW(k0,l,y,x),b.add(k0)}),z=_.pop(),v!==null)v.renderEnd();return b},this.compileAsync=function(k,y,l=null){let b=this.compile(k,y,l);return new Promise((x)=>{function k0(){if(b.forEach(function(I0){let A0=j.get(I0).currentProgram;if(A0===void 0||A0.isReady())b.delete(I0)}),b.size===0){x(k);return}setTimeout(k0,10)}if(i0.get("KHR_parallel_shader_compile")!==null)k0();else setTimeout(k0,10)})};let h6=null;function UH(k){if(h6)h6(k)}function GW(){f9.stop()}function NW(){f9.start()}let f9=new iK;if(f9.setAnimationLoop(UH),typeof self<"u")f9.setContext(self);this.setAnimationLoop=function(k){h6=k,O0.setAnimationLoop(k),k===null?f9.stop():f9.start()},O0.addEventListener("sessionstart",GW),O0.addEventListener("sessionend",NW),this.render=function(k,y){if(y!==void 0&&y.isCamera!==!0){x0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(g===!0)return;if(v!==null)v.renderStart(k,y);let l=O0.enabled===!0&&O0.isPresenting===!0,b=M!==null&&(m===null||l)&&M.begin(I,m);if(k.matrixWorldAutoUpdate===!0)k.updateMatrixWorld();if(y.parent===null&&y.matrixWorldAutoUpdate===!0)y.updateMatrixWorld();if(O0.enabled===!0&&O0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(O0.cameraAutoUpdate===!0)O0.updateCamera(y);y=O0.getCamera()}if(k.isScene===!0)k.onBeforeRender(I,k,y,m);if(z=F0.get(k,_.length),z.init(y),z.state.textureUnits=d.getTextureUnits(),_.push(z),X0.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),t.setFromProjectionMatrix(X0,N$,y.reversedDepth),K0=this.localClippingEnabled,$0=G0.init(this.clippingPlanes,K0),L=P0.get(k,w.length),L.init(),w.push(L),O0.enabled===!0&&O0.isPresenting===!0){let I0=I.xr.getDepthSensingMesh();if(I0!==null)b6(I0,y,-1/0,I.sortObjects)}if(b6(k,y,0,I.sortObjects),L.finish(),v!==null)v.updateLights(z.state.lightsArray);if(I.sortObjects===!0)L.sort(W0,j0);if(p0=O0.enabled===!1||O0.isPresenting===!1||O0.hasDepthSensing()===!1,p0)b0.addToRenderList(L,k);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if($0===!0)G0.beginShadows();let x=z.state.shadowsArray;if(v0.render(x,k,y),$0===!0)G0.endShadows();if((b&&M.hasRenderPass())===!1){let{opaque:I0,transmissive:R0}=L;if(z.setupLights(),y.isArrayCamera){let A0=y.cameras;if(R0.length>0)for(let w0=0,c0=A0.length;w0<c0;w0++){let a0=A0[w0];qW(I0,R0,k,a0)}if(p0)b0.render(k);for(let w0=0,c0=A0.length;w0<c0;w0++){let a0=A0[w0];EW(L,k,a0,a0.viewport)}}else{if(R0.length>0)qW(I0,R0,k,y);if(p0)b0.render(k);EW(L,k,y)}}if(m!==null&&o===0)d.updateMultisampleRenderTarget(m),d.updateRenderTargetMipmap(m);if(b)M.end(I);if(k.isScene===!0)k.onAfterRender(I,k,y);if(q0.resetDefaultState(),Z0=-1,u=null,_.pop(),_.length>0){if(z=_[_.length-1],d.setTextureUnits(z.state.textureUnits),$0===!0)G0.setGlobalState(I.clippingPlanes,z.state.camera)}else z=null;if(w.pop(),w.length>0)L=w[w.length-1];else L=null;if(v!==null)v.renderEnd()};function b6(k,y,l,b){if(k.visible===!1)return;if(k.layers.test(y.layers)){if(k.isGroup)l=k.renderOrder;else if(k.isLOD){if(k.autoUpdate===!0)k.update(y)}else if(k.isLightProbeGrid)z.pushLightProbeGrid(k);else if(k.isLight){if(z.pushLight(k),k.castShadow)z.pushShadow(k)}else if(k.isSprite){if(!k.frustumCulled||k.intersectsFrustum(t)){if(b)_0.setFromMatrixPosition(k.matrixWorld).applyMatrix4(X0);let I0=c.update(k),R0=k.material;if(R0.visible)L.push(k,I0,R0,l,_0.z,null,y)}}else if(k.isMesh||k.isLine||k.isPoints){if(!k.frustumCulled||k.intersectsFrustum(t)){let I0=c.update(k),R0=k.material;if(b){if(k.boundingSphere!==void 0){if(k.boundingSphere===null)k.computeBoundingSphere();_0.copy(k.boundingSphere.center)}else{if(I0.boundingSphere===null)I0.computeBoundingSphere();_0.copy(I0.boundingSphere.center)}_0.applyMatrix4(k.matrixWorld).applyMatrix4(X0)}if(Array.isArray(R0)){let A0=I0.groups;for(let w0=0,c0=A0.length;w0<c0;w0++){let a0=A0[w0],C0=R0[a0.materialIndex];if(C0&&C0.visible)L.push(k,I0,C0,l,_0.z,a0,y)}}else if(R0.visible)L.push(k,I0,R0,l,_0.z,null,y)}}}let k0=k.children;for(let I0=0,R0=k0.length;I0<R0;I0++)b6(k0[I0],y,l,b)}function EW(k,y,l,b){let{opaque:x,transmissive:k0,transparent:I0}=k;if(z.setupLightsView(l),$0===!0)G0.setGlobalState(I.clippingPlanes,l);if(b)V.viewport(r.copy(b));if(x.length>0)L7(x,y,l);if(k0.length>0)L7(k0,y,l);if(I0.length>0)L7(I0,y,l);V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function qW(k,y,l,b){if((l.isScene===!0?l.overrideMaterial:null)!==null)return;if(z.state.transmissionRenderTarget[b.id]===void 0){let C0=i0.has("EXT_color_buffer_half_float")||i0.has("EXT_color_buffer_float");z.state.transmissionRenderTarget[b.id]=new pJ(1,1,{generateMipmaps:!0,type:C0?X9:rJ,minFilter:l9,samples:Math.max(4,o0.samples),stencilBuffer:Z,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:r0.workingColorSpace})}let k0=z.state.transmissionRenderTarget[b.id],I0=b.viewport||r;k0.setSize(I0.z*I.transmissionResolutionScale,I0.w*I.transmissionResolutionScale);let R0=I.getRenderTarget(),A0=I.getActiveCubeFace(),w0=I.getActiveMipmapLevel();if(I.setRenderTarget(k0),I.getClearColor(S0),ZJ=I.getClearAlpha(),ZJ<1)I.setClearColor(16777215,0.5);if(I.clear(),p0)b0.render(l);let c0=I.toneMapping;I.toneMapping=aJ;let a0=b.viewport;if(b.viewport!==void 0)b.viewport=void 0;if(z.setupLightsView(b),$0===!0)G0.setGlobalState(I.clippingPlanes,b);if(L7(k,l,b),d.updateMultisampleRenderTarget(k0),d.updateRenderTargetMipmap(k0),i0.has("WEBGL_multisampled_render_to_texture")===!1){let C0=!1;for(let $J=0,LJ=y.length;$J<LJ;$J++){let FJ=y[$J],{object:GJ,geometry:wJ,material:B0,group:jJ}=FJ;if(B0.side===H9&&GJ.layers.test(b.layers)){let t0=B0.side;B0.side=TJ,B0.needsUpdate=!0,FW(GJ,l,b,wJ,B0,jJ),B0.side=t0,B0.needsUpdate=!0,C0=!0}}if(C0===!0)d.updateMultisampleRenderTarget(k0),d.updateRenderTargetMipmap(k0)}if(I.setRenderTarget(R0,A0,w0),I.setClearColor(S0,ZJ),a0!==void 0)b.viewport=a0;I.toneMapping=c0}function L7(k,y,l){let b=y.isScene===!0?y.overrideMaterial:null;for(let x=0,k0=k.length;x<k0;x++){let I0=k[x],{object:R0,geometry:A0,group:w0}=I0,c0=I0.material;if(c0.allowOverride===!0&&b!==null)c0=b;if(R0.layers.test(l.layers))FW(R0,y,l,A0,c0,w0)}}function FW(k,y,l,b,x,k0){if(v!==null&&x.isNodeMaterial)v.setObject(k,x);if(k.onBeforeRender(I,y,l,b,x,k0),k.modelViewMatrix.multiplyMatrices(l.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),x.onBeforeRender(I,y,l,b,k,k0),x.transparent===!0&&x.side===H9&&x.forceSinglePass===!1)x.side=TJ,x.needsUpdate=!0,I.renderBufferDirect(l,y,b,x,k,k0),x.side=C8,x.needsUpdate=!0,I.renderBufferDirect(l,y,b,x,k,k0),x.side=H9;else I.renderBufferDirect(l,y,b,x,k,k0);k.onAfterRender(I,y,l,b,x,k0)}function V7(k,y,l){if(y.isScene!==!0)y=y0;let b=j.get(k),x=z.state.lights,k0=z.state.shadowsArray,I0=x.state.version,R0=a.getParameters(k,x.state,k0,y,l,z.state.lightProbeGridArray),A0=a.getProgramCacheKey(R0),w0=b.programs;b.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?y.environment:null,b.fog=y.fog;let c0=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;if(b.envMap=e.get(k.envMap||b.environment,c0),b.envMapRotation=b.environment!==null&&k.envMap===null?y.environmentRotation:k.envMapRotation,w0===void 0)k.addEventListener("dispose",eJ),w0=new Map,b.programs=w0;let a0=w0.get(A0);if(a0!==void 0){if(b.currentProgram===a0&&b.lightsStateVersion===I0)return OW(k,R0),a0}else{if(R0.uniforms=a.getUniforms(k),v!==null&&k.isNodeMaterial)v.build(k,l,R0);k.onBeforeCompile(R0,I),a0=a.acquireProgram(R0,A0),w0.set(A0,a0),b.uniforms=R0.uniforms}let C0=b.uniforms;if(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)C0.clippingPlanes=G0.uniform;if(OW(k,R0),b.needsLights=qH(k),b.lightsStateVersion=I0,b.needsLights)C0.ambientLightColor.value=x.state.ambient,C0.lightProbe.value=x.state.probe,C0.sunLights.value=x.state.sun,C0.sunLightShadows.value=x.state.sunShadow,C0.directionalLights.value=x.state.directional,C0.directionalLightShadows.value=x.state.directionalShadow,C0.spotLights.value=x.state.spot,C0.spotLightShadows.value=x.state.spotShadow,C0.rectAreaLights.value=x.state.rectArea,C0.ltc_1.value=x.state.rectAreaLTC1,C0.ltc_2.value=x.state.rectAreaLTC2,C0.pointLights.value=x.state.point,C0.pointLightShadows.value=x.state.pointShadow,C0.hemisphereLights.value=x.state.hemi,C0.sunShadowMatrix.value=x.state.sunShadowMatrix,C0.sunShadowCascade.value=x.state.sunShadowCascade,C0.directionalShadowMatrix.value=x.state.directionalShadowMatrix,C0.spotLightMatrix.value=x.state.spotLightMatrix,C0.spotLightMap.value=x.state.spotLightMap,C0.pointShadowMatrix.value=x.state.pointShadowMatrix;return b.lightProbeGrid=z.state.lightProbeGridArray.length>0,b.currentProgram=a0,b.uniformsList=null,a0}function DW(k){if(k.uniformsList===null){let y=k.currentProgram.getUniforms();k.uniformsList=k7.seqWithValue(y.seq,k.uniforms)}return k.uniformsList}function OW(k,y){let l=j.get(k);l.outputColorSpace=y.outputColorSpace,l.batching=y.batching,l.batchingColor=y.batchingColor,l.instancing=y.instancing,l.instancingColor=y.instancingColor,l.instancingMorph=y.instancingMorph,l.skinning=y.skinning,l.morphTargets=y.morphTargets,l.morphNormals=y.morphNormals,l.morphColors=y.morphColors,l.morphTargetsCount=y.morphTargetsCount,l.numClippingPlanes=y.numClippingPlanes,l.numIntersection=y.numClipIntersection,l.vertexAlphas=y.vertexAlphas,l.vertexTangents=y.vertexTangents,l.toneMapping=y.toneMapping}function GH(k,y){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;C.setFromMatrixPosition(y.matrixWorld);for(let l=0,b=k.length;l<b;l++){let x=k[l];if(x.texture!==null&&x.boundingBox.containsPoint(C))return x}return null}function NH(k,y,l,b,x){if(y.isScene!==!0)y=y0;d.resetTextureUnits();let k0=y.fog,I0=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?y.environment:null,R0=m===null?I.outputColorSpace:m.isXRRenderTarget===!0?m.texture.colorSpace:r0.workingColorSpace,A0=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,w0=e.get(b.envMap||I0,A0),c0=b.vertexColors===!0&&!!l.attributes.color&&l.attributes.color.itemSize===4,a0=!!l.attributes.tangent&&(!!b.normalMap||b.anisotropy>0),C0=!!l.morphAttributes.position,$J=!!l.morphAttributes.normal,LJ=!!l.morphAttributes.color,FJ=aJ;if(b.toneMapped){if(m===null||m.isXRRenderTarget===!0)FJ=I.toneMapping}let GJ=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,wJ=GJ!==void 0?GJ.length:0,B0=j.get(b),jJ=z.state.lights;if($0===!0){if(K0===!0||k!==u){let qJ=k===u&&b.id===Z0;G0.setState(b,k,qJ)}}let t0=!1;if(b.version===B0.__version){if(B0.needsLights&&B0.lightsStateVersion!==jJ.state.version)t0=!0;else if(B0.outputColorSpace!==R0)t0=!0;else if(x.isBatchedMesh&&B0.batching===!1)t0=!0;else if(!x.isBatchedMesh&&B0.batching===!0)t0=!0;else if(x.isBatchedMesh&&B0.batchingColor===!0&&x._colorsTexture===null)t0=!0;else if(x.isBatchedMesh&&B0.batchingColor===!1&&x._colorsTexture!==null)t0=!0;else if(x.isInstancedMesh&&B0.instancing===!1)t0=!0;else if(!x.isInstancedMesh&&B0.instancing===!0)t0=!0;else if(x.isSkinnedMesh&&B0.skinning===!1)t0=!0;else if(!x.isSkinnedMesh&&B0.skinning===!0)t0=!0;else if(x.isInstancedMesh&&B0.instancingColor===!0&&x.instanceColor===null)t0=!0;else if(x.isInstancedMesh&&B0.instancingColor===!1&&x.instanceColor!==null)t0=!0;else if(x.isInstancedMesh&&B0.instancingMorph===!0&&x.morphTexture===null)t0=!0;else if(x.isInstancedMesh&&B0.instancingMorph===!1&&x.morphTexture!==null)t0=!0;else if(B0.envMap!==w0)t0=!0;else if(b.fog===!0&&B0.fog!==k0)t0=!0;else if(B0.numClippingPlanes!==void 0&&(B0.numClippingPlanes!==G0.numPlanes||B0.numIntersection!==G0.numIntersection))t0=!0;else if(B0.vertexAlphas!==c0)t0=!0;else if(B0.vertexTangents!==a0)t0=!0;else if(B0.morphTargets!==C0)t0=!0;else if(B0.morphNormals!==$J)t0=!0;else if(B0.morphColors!==LJ)t0=!0;else if(B0.toneMapping!==FJ)t0=!0;else if(B0.morphTargetsCount!==wJ)t0=!0;else if(!!B0.lightProbeGrid!==z.state.lightProbeGridArray.length>0)t0=!0}else t0=!0,B0.__version=b.version;let mJ=B0.currentProgram;if(t0===!0){if(mJ=V7(b,y,x),v&&b.isNodeMaterial)v.onUpdateProgram(b,mJ,B0)}let J9=!1,I9=!1,J8=!1,UJ=mJ.getUniforms(),MJ=B0.uniforms;if(V.useProgram(mJ.program))J9=!0,I9=!0,J8=!0;if(b.id!==Z0)Z0=b.id,I9=!0;if(B0.needsLights){let qJ=GH(z.state.lightProbeGridArray,x);if(B0.lightProbeGrid!==qJ)B0.lightProbeGrid=qJ,I9=!0}if(J9||u!==k){if(V.buffers.depth.getReversed()&&k.reversedDepth!==!0)k._reversedDepth=!0,k.updateProjectionMatrix();UJ.setValue(P,"projectionMatrix",k.projectionMatrix),UJ.setValue(P,"viewMatrix",k.matrixWorldInverse);let A9=UJ.map.cameraPosition;if(A9!==void 0)A9.setValue(P,M0.setFromMatrixPosition(k.matrixWorld));if(o0.logarithmicDepthBuffer)UJ.setValue(P,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2));if(b.isMeshPhongMaterial||b.isMeshToonMaterial||b.isMeshLambertMaterial||b.isMeshBasicMaterial||b.isMeshStandardMaterial||b.isShaderMaterial)UJ.setValue(P,"isOrthographic",k.isOrthographicCamera===!0);if(u!==k)u=k,I9=!0,J8=!0}if(B0.needsLights){if(jJ.state.sunShadowMap.length>0)UJ.setValue(P,"sunShadowMap",jJ.state.sunShadowMap,d);if(jJ.state.directionalShadowMap.length>0)UJ.setValue(P,"directionalShadowMap",jJ.state.directionalShadowMap,d);if(jJ.state.spotShadowMap.length>0)UJ.setValue(P,"spotShadowMap",jJ.state.spotShadowMap,d);if(jJ.state.pointShadowMap.length>0)UJ.setValue(P,"pointShadowMap",jJ.state.pointShadowMap,d)}if(x.isSkinnedMesh){UJ.setOptional(P,x,"bindMatrix"),UJ.setOptional(P,x,"bindMatrixInverse");let qJ=x.skeleton;if(qJ){if(qJ.boneTexture===null)qJ.computeBoneTexture();UJ.setValue(P,"boneTexture",qJ.boneTexture,d)}}if(x.isBatchedMesh){if(UJ.setOptional(P,x,"batchingTexture"),UJ.setValue(P,"batchingTexture",x._matricesTexture,d),UJ.setOptional(P,x,"batchingIdTexture"),UJ.setValue(P,"batchingIdTexture",x._indirectTexture,d),UJ.setOptional(P,x,"batchingColorTexture"),x._colorsTexture!==null)UJ.setValue(P,"batchingColorTexture",x._colorsTexture,d)}let z9=l.morphAttributes;if(z9.position!==void 0||z9.normal!==void 0||z9.color!==void 0)e0.update(x,l,mJ);if(I9||B0.receiveShadow!==x.receiveShadow)B0.receiveShadow=x.receiveShadow,UJ.setValue(P,"receiveShadow",x.receiveShadow);if((b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial)&&b.envMap===null&&y.environment!==null)MJ.envMapIntensity.value=y.environmentIntensity;if(MJ.dfgLUT!==void 0)MJ.dfgLUT.value=w5();if(I9){if(UJ.setValue(P,"toneMappingExposure",I.toneMappingExposure),B0.needsLights)EH(MJ,J8);if(k0&&b.fog===!0)L0.refreshFogUniforms(MJ,k0);if(L0.refreshMaterialUniforms(MJ,b,H0,n,z.state.transmissionRenderTarget[k.id]),B0.needsLights&&B0.lightProbeGrid){let qJ=B0.lightProbeGrid;MJ.probesSH.value=qJ.texture,MJ.probesMin.value.copy(qJ.boundingBox.min),MJ.probesMax.value.copy(qJ.boundingBox.max),MJ.probesResolution.value.copy(qJ.resolution)}k7.upload(P,DW(B0),MJ,d)}if(b.isShaderMaterial&&b.uniformsNeedUpdate===!0)k7.upload(P,DW(B0),MJ,d),b.uniformsNeedUpdate=!1;if(b.isSpriteMaterial)UJ.setValue(P,"center",x.center);if(UJ.setValue(P,"modelViewMatrix",x.modelViewMatrix),UJ.setValue(P,"normalMatrix",x.normalMatrix),UJ.setValue(P,"modelMatrix",x.matrixWorld),b.uniformsGroups!==void 0){let qJ=b.uniformsGroups;for(let A9=0,Q8=qJ.length;A9<Q8;A9++){let MW=qJ[A9];V0.update(MW,mJ),V0.bind(MW,mJ)}}return mJ}function EH(k,y){k.ambientLightColor.needsUpdate=y,k.lightProbe.needsUpdate=y,k.sunLights.needsUpdate=y,k.sunLightShadows.needsUpdate=y,k.directionalLights.needsUpdate=y,k.directionalLightShadows.needsUpdate=y,k.pointLights.needsUpdate=y,k.pointLightShadows.needsUpdate=y,k.spotLights.needsUpdate=y,k.spotLightShadows.needsUpdate=y,k.rectAreaLights.needsUpdate=y,k.hemisphereLights.needsUpdate=y}function qH(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}this.getActiveCubeFace=function(){return p},this.getActiveMipmapLevel=function(){return o},this.getRenderTarget=function(){return m},this.setRenderTargetTextures=function(k,y,l){let b=j.get(k);if(b.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,b.__autoAllocateDepthBuffer===!1)b.__useRenderToTexture=!1;j.get(k.texture).__webglTexture=y,j.get(k.depthTexture).__webglTexture=b.__autoAllocateDepthBuffer?void 0:l,b.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,y){let l=j.get(k);l.__webglFramebuffer=y,l.__useDefaultFramebuffer=y===void 0},this.setRenderTarget=function(k,y=0,l=0){m=k,p=y,o=l;let b=null,x=!1,k0=!1;if(k){let R0=j.get(k);if(R0.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(P.FRAMEBUFFER,R0.__webglFramebuffer),r.copy(k.viewport),Q0.copy(k.scissor),T0=k.scissorTest,V.viewport(r),V.scissor(Q0),V.setScissorTest(T0),Z0=-1;return}else if(R0.__webglFramebuffer===void 0)d.setupRenderTarget(k);else if(R0.__hasExternalTextures)d.rebindTextures(k,j.get(k.texture).__webglTexture,j.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let c0=k.depthTexture;if(R0.__boundDepthTexture!==c0){if(c0!==null&&j.has(c0)&&(k.width!==c0.image.width||k.height!==c0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");d.setupDepthRenderbuffer(k)}}let A0=k.texture;if(A0.isData3DTexture||A0.isDataArrayTexture||A0.isCompressedArrayTexture)k0=!0;let w0=j.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget){if(Array.isArray(w0[y]))b=w0[y][l];else b=w0[y];x=!0}else if(k.samples>0&&d.useMultisampledRTT(k)===!1)b=j.get(k).__webglMultisampledFramebuffer;else if(Array.isArray(w0))b=w0[l];else b=w0;r.copy(k.viewport),Q0.copy(k.scissor),T0=k.scissorTest}else r.copy(h0).multiplyScalar(H0).floor(),Q0.copy(z0).multiplyScalar(H0).floor(),T0=KJ;if(l!==0)b=h;if(V.bindFramebuffer(P.FRAMEBUFFER,b))V.drawBuffers(k,b);if(V.viewport(r),V.scissor(Q0),V.setScissorTest(T0),x){let R0=j.get(k.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+y,R0.__webglTexture,l)}else if(k0){let R0=y;for(let A0=0;A0<k.textures.length;A0++){let w0=j.get(k.textures[A0]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+A0,w0.__webglTexture,l,R0)}}else if(k!==null&&l!==0){let R0=j.get(k.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,R0.__webglTexture,l)}Z0=-1};function RW(k){let y=j.get(k);if(y.__readFormat!==k.format||y.__readType!==k.type)y.__readFormat=k.format,y.__readType=k.type,y.__formatReadable=o0.textureFormatReadable(k.format),y.__typeReadable=o0.textureTypeReadable(k.type);return y}if(this.readRenderTargetPixels=function(k,y,l,b,x,k0,I0,R0=0){if(!(k&&k.isWebGLRenderTarget)){x0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let A0=j.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&I0!==void 0)A0=A0[I0];if(A0){V.bindFramebuffer(P.FRAMEBUFFER,A0);try{let w0=k.textures[R0],c0=w0.format,a0=w0.type;if(k.textures.length>1)P.readBuffer(P.COLOR_ATTACHMENT0+R0);let C0=RW(w0);if(C0.__formatReadable===!1){x0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(C0.__typeReadable===!1){x0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(y>=0&&y<=k.width-b&&(l>=0&&l<=k.height-x))P.readPixels(y,l,b,x,s.convert(c0),s.convert(a0),k0)}finally{let w0=m!==null?j.get(m).__webglFramebuffer:null;V.bindFramebuffer(P.FRAMEBUFFER,w0)}}},this.readRenderTargetPixelsAsync=async function(k,y,l,b,x,k0,I0,R0=0){if(!(k&&k.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let A0=j.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&I0!==void 0)A0=A0[I0];if(A0)if(y>=0&&y<=k.width-b&&(l>=0&&l<=k.height-x)){V.bindFramebuffer(P.FRAMEBUFFER,A0);let w0=k.textures[R0],c0=w0.format,a0=w0.type;if(k.textures.length>1)P.readBuffer(P.COLOR_ATTACHMENT0+R0);let C0=RW(w0);if(C0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(C0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let $J=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,$J),P.bufferData(P.PIXEL_PACK_BUFFER,k0.byteLength,P.STREAM_READ),P.readPixels(y,l,b,x,s.convert(c0),s.convert(a0),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let LJ=m!==null?j.get(m).__webglFramebuffer:null;V.bindFramebuffer(P.FRAMEBUFFER,LJ);let FJ=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await WK(P,FJ,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,$J),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,k0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer($J),P.deleteSync(FJ),k0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,y=null,l=0){let b=Math.pow(2,-l),x=Math.floor(k.image.width*b),k0=Math.floor(k.image.height*b),I0=y!==null?y.x:0,R0=y!==null?y.y:0;d.setTexture2D(k,0),P.copyTexSubImage2D(P.TEXTURE_2D,l,0,0,I0,R0,x,k0),V.unbindTexture()},this.copyTextureToTexture=function(k,y,l=null,b=null,x=0,k0=0){let I0,R0,A0,w0,c0,a0,C0,$J,LJ,FJ=k.isCompressedTexture?k.mipmaps[k0]:k.image;if(l!==null)I0=l.max.x-l.min.x,R0=l.max.y-l.min.y,A0=l.isBox3?l.max.z-l.min.z:1,w0=l.min.x,c0=l.min.y,a0=l.isBox3?l.min.z:0;else{let MJ=Math.pow(2,-x);if(I0=Math.floor(FJ.width*MJ),R0=Math.floor(FJ.height*MJ),k.isDataArrayTexture)A0=FJ.depth;else if(k.isData3DTexture)A0=Math.floor(FJ.depth*MJ);else A0=1;w0=0,c0=0,a0=0}if(b!==null)C0=b.x,$J=b.y,LJ=b.z;else C0=0,$J=0,LJ=0;let GJ=s.convert(y.format),wJ=s.convert(y.type),B0;if(y.isData3DTexture)d.setTexture3D(y,0),B0=P.TEXTURE_3D;else if(y.isDataArrayTexture||y.isCompressedArrayTexture)d.setTexture2DArray(y,0),B0=P.TEXTURE_2D_ARRAY;else d.setTexture2D(y,0),B0=P.TEXTURE_2D;V.activeTexture(P.TEXTURE0),V.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,y.flipY),V.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),V.pixelStorei(P.UNPACK_ALIGNMENT,y.unpackAlignment);let jJ=V.getParameter(P.UNPACK_ROW_LENGTH),t0=V.getParameter(P.UNPACK_IMAGE_HEIGHT),mJ=V.getParameter(P.UNPACK_SKIP_PIXELS),J9=V.getParameter(P.UNPACK_SKIP_ROWS),I9=V.getParameter(P.UNPACK_SKIP_IMAGES);V.pixelStorei(P.UNPACK_ROW_LENGTH,FJ.width),V.pixelStorei(P.UNPACK_IMAGE_HEIGHT,FJ.height),V.pixelStorei(P.UNPACK_SKIP_PIXELS,w0),V.pixelStorei(P.UNPACK_SKIP_ROWS,c0),V.pixelStorei(P.UNPACK_SKIP_IMAGES,a0);let J8=k.isDataArrayTexture||k.isData3DTexture,UJ=y.isDataArrayTexture||y.isData3DTexture;if(k.isDepthTexture){let MJ=j.get(k),z9=j.get(y),qJ=j.get(MJ.__renderTarget),A9=j.get(z9.__renderTarget);V.bindFramebuffer(P.READ_FRAMEBUFFER,qJ.__webglFramebuffer),V.bindFramebuffer(P.DRAW_FRAMEBUFFER,A9.__webglFramebuffer);for(let Q8=0;Q8<A0;Q8++){if(J8)P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,j.get(k).__webglTexture,x,a0+Q8),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,j.get(y).__webglTexture,k0,LJ+Q8);P.blitFramebuffer(w0,c0,I0,R0,C0,$J,I0,R0,P.DEPTH_BUFFER_BIT,P.NEAREST)}V.bindFramebuffer(P.READ_FRAMEBUFFER,null),V.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(x!==0||k.isRenderTargetTexture||j.has(k)){let MJ=j.get(k),z9=j.get(y);V.bindFramebuffer(P.READ_FRAMEBUFFER,i),V.bindFramebuffer(P.DRAW_FRAMEBUFFER,T);for(let qJ=0;qJ<A0;qJ++){if(J8)P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,MJ.__webglTexture,x,a0+qJ);else P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,MJ.__webglTexture,x);if(UJ)P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,z9.__webglTexture,k0,LJ+qJ);else P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,z9.__webglTexture,k0);if(x!==0)P.blitFramebuffer(w0,c0,I0,R0,C0,$J,I0,R0,P.COLOR_BUFFER_BIT,P.NEAREST);else if(UJ)P.copyTexSubImage3D(B0,k0,C0,$J,LJ+qJ,w0,c0,I0,R0);else P.copyTexSubImage2D(B0,k0,C0,$J,w0,c0,I0,R0)}V.bindFramebuffer(P.READ_FRAMEBUFFER,null),V.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(UJ)if(k.isDataTexture||k.isData3DTexture)P.texSubImage3D(B0,k0,C0,$J,LJ,I0,R0,A0,GJ,wJ,FJ.data);else if(y.isCompressedArrayTexture)P.compressedTexSubImage3D(B0,k0,C0,$J,LJ,I0,R0,A0,GJ,FJ.data);else P.texSubImage3D(B0,k0,C0,$J,LJ,I0,R0,A0,GJ,wJ,FJ);else if(k.isDataTexture)P.texSubImage2D(P.TEXTURE_2D,k0,C0,$J,I0,R0,GJ,wJ,FJ.data);else if(k.isCompressedTexture)P.compressedTexSubImage2D(P.TEXTURE_2D,k0,C0,$J,FJ.width,FJ.height,GJ,FJ.data);else P.texSubImage2D(P.TEXTURE_2D,k0,C0,$J,I0,R0,GJ,wJ,FJ);if(V.pixelStorei(P.UNPACK_ROW_LENGTH,jJ),V.pixelStorei(P.UNPACK_IMAGE_HEIGHT,t0),V.pixelStorei(P.UNPACK_SKIP_PIXELS,mJ),V.pixelStorei(P.UNPACK_SKIP_ROWS,J9),V.pixelStorei(P.UNPACK_SKIP_IMAGES,I9),k0===0&&y.generateMipmaps)P.generateMipmap(B0);V.unbindTexture()},this.initRenderTarget=function(k){if(j.get(k).__webglFramebuffer===void 0)d.setupRenderTarget(k)},this.initTexture=function(k){if(k.isCubeTexture)d.setTextureCube(k,0);else if(k.isData3DTexture)d.setTexture3D(k,0);else if(k.isDataArrayTexture||k.isCompressedArrayTexture)d.setTexture2DArray(k,0);else d.setTexture2D(k,0);V.unbindTexture()},this.resetState=function(){p=0,o=0,m=null,V.reset(),q0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return N$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=r0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=r0._getUnpackColorSpace()}}class P5 extends q6{constructor(){super();this.name="RoomEnvironment",this.position.y=-3.5;let J=new v9;J.deleteAttribute("uv");let Q=new T8({side:TJ}),$=new T8,W=new S6(16777215,900,28,2);W.position.set(0.418,16.199,0.3),this.add(W);let Z=new kJ(J,Q);Z.position.set(-0.757,13.219,0.717),Z.scale.set(31.713,28.305,28.591),this.add(Z);let K=new M6(J,$,6),H=new RJ;H.position.set(-10.906,2.009,1.846),H.rotation.set(0,-0.195,0),H.scale.set(2.328,7.905,4.651),H.updateMatrix(),K.setMatrixAt(0,H.matrix),H.position.set(-5.607,-0.754,-0.758),H.rotation.set(0,0.994,0),H.scale.set(1.97,1.534,3.955),H.updateMatrix(),K.setMatrixAt(1,H.matrix),H.position.set(6.167,0.857,7.803),H.rotation.set(0,0.561,0),H.scale.set(3.927,6.285,3.687),H.updateMatrix(),K.setMatrixAt(2,H.matrix),H.position.set(-2.017,0.018,6.124),H.rotation.set(0,0.333,0),H.scale.set(2.002,4.566,2.064),H.updateMatrix(),K.setMatrixAt(3,H.matrix),H.position.set(2.291,-0.756,-2.621),H.rotation.set(0,-0.286,0),H.scale.set(1.546,1.552,1.496),H.updateMatrix(),K.setMatrixAt(4,H.matrix),H.position.set(-2.193,-0.369,-5.547),H.rotation.set(0,0.516,0),H.scale.set(3.875,3.487,2.986),H.updateMatrix(),K.setMatrixAt(5,H.matrix),this.add(K);let Y=new kJ(J,f8(50));Y.position.set(-16.116,14.37,8.208),Y.scale.set(0.1,2.428,2.739),this.add(Y);let X=new kJ(J,f8(50));X.position.set(-16.109,18.021,-8.207),X.scale.set(0.1,2.425,2.751),this.add(X);let U=new kJ(J,f8(17));U.position.set(14.904,12.198,-1.832),U.scale.set(0.15,4.265,6.331),this.add(U);let N=new kJ(J,f8(43));N.position.set(-0.462,8.89,14.52),N.scale.set(4.38,5.441,0.088),this.add(N);let E=new kJ(J,f8(20));E.position.set(3.235,11.486,-12.541),E.scale.set(2.5,2,0.1),this.add(E);let G=new kJ(J,f8(100));G.position.set(0,20,0),G.scale.set(1,0.1,1),this.add(G)}dispose(){let J=new Set;this.traverse((Q)=>{if(Q.isMesh)J.add(Q.geometry),J.add(Q.material)});for(let Q of J)Q.dispose()}}function f8(J){return new w6({color:0,emissive:16777215,emissiveIntensity:J})}
export{HZ as b,C8 as c,TJ as d,FQ as e,VQ as f,bZ as g,$6 as h,iZ as i,jH as j,Y0 as k,V9 as l,S as m,CJ as n,RJ as o,L8 as p,m0 as q,q6 as r,B9 as s,gJ as t,AJ as u,$9 as v,R$ as w,YK as x,O6 as y,kJ as z,M$ as A,XK as B,UK as C,v9 as D,V$ as E,z$ as F,A$ as G,C$ as H,w$ as I,e7 as J,C6 as K,_$ as L,F7 as M,P$ as N,T$ as O,S$ as P,j$ as Q,DK as R,uJ as S,T8 as T,RK as U,LK as V,vJ as W,IK as X,zK as Y,CK as Z,KW as _,_5 as $,P5 as aa};
