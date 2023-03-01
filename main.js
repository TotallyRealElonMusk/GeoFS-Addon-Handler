    if (!window.addons){
        initFunction()
    }
    async function initFunction(){
        window.addons = {}
        await new Promise(resolve => setTimeout(resolve, 1000));

        //controls.runNodeClickHandlers=function(n){for(var o in internalNodeHandlerManips(n),controls.nodeClickHandlers)o==n&&controls.nodeClickHandlers[o](n)};

        let TouchNode = `controls.runNodeClickHandlers=function(n){`
        addons.maritime ? TouchNode+='internalNodeHandlerMaritime(n);' : null
        addons.manips ? TouchNode+='internalNodeHandlerManips(n);' : null
        TouchNode+=`for(var o in controls.nodeClickHandlers)o==n&&controls.nodeClickHandlers[o](n)};`

        let AddPart = `geofs.aircraft.Aircraft.prototype.addParts=function(a,b,c){c=c||1;for(var d=0;d<a.length;d++){var e=a[d];if(e.include){var g=geofs.includes[e.include];e=Object.assign(e,g[0]);for(var f=1;f<g.length;f++){var k=Object.assign({},g[f],{parent:e.name});k.name=e.name+k.name;a.push(k)}}
if(e.indices&&0<e.indices){for(f=2;f<=e.indices;f++)k=Object.assign({},e,{indices:null}),k.name=e.name+f,k.node+=f,a.push(k);e.name+="1";e.node+="1"}}
for(d=0;d<a.length;d++){e=a[d];e.points=e.points||{};e.type=e.type||!1;e.brakesController=e.brakesController||!1;e.animations=e.animations||[];geofs.aircraft.instance.parts[e.name]=e;geofs.aircraft.instance.addOffsets(e,c);e.forceDirection&&(e.forceDirection=AXIS_TO_INDEX[e.forceDirection]);e.rotation&&(e.rotation=V3.toRadians(e.rotation));e.scale=e.scale||[1,1,1];e.scale=V3.scale(e.scale,c);e.originalScale=e.scale;e.model&&(g=e.model,b&&"/"!=e.model[0]&&!e.include&&(g=b+e.model),e["3dmodel"]=new geofs.api.Model(g,{shadows:e.shadows?window[e.shadows]:SHADOWS_ALL,incrementallyLoadTextures:!1}),e.renderer&&(e.rendererInstance=new instruments.Renderer(e.renderer)));e.light&&(e.lightBillboard=new geofs.fx.light(null,e.light,{scale:.2}),geofs.aircraft.instance.lights.push(e));e.object3d=new Object3D(e);e.suspension&&(e.suspension.length?(e.suspension.origin=[e.collisionPoints[0][0],e.collisionPoints[0][1],e.collisionPoints[0][2]+e.suspension.length],g=e.suspension.length):(e.suspension.origin=[e.collisionPoints[0][0],e.collisionPoints[0][1],0],g=-e.collisionPoints[0][2]),e.suspension.restLength=g,"rotation"==e.suspension.motion?(g=V3.length(e.collisionPoints[0]),g=Math.atan2(e.collisionPoints[0][0]/g,e.collisionPoints[0][2]/g),g={type:"rotate",axis:e.suspension.axis||"Y",value:e.name+"Suspension",ratio:(0>g?g+HALF_PI:g-HALF_PI)*RAD_TO_DEGREES*(e.suspension.ratio||1)}):g={type:"translate",axis:e.suspension.axis||"Z",value:e.name+"Suspension",ratio:e.suspension.ratio||1},e.animations.push(g),e.suspension.hardPoint=e.suspension.hardPoint||.5,e.points.suspensionOrigin=V3.dup(e.suspension.origin),geofs.aircraft.instance.suspensions.push(e));for(f=0;f<e.animations.length;f++)g=e.animations[f],g.ratio=g.ratio||1,g.offset=g.offset||0,g.currentValue=null,g.delay&&(g.ratio/=1-Math.abs(g.delay)),"rotate"==g.type&&(k=g.method||"rotate","parent"==g.frame&&(k="rotateParentFrame"),g.rotationMethod=e.object3d[k+g.axis]),"translate"==g.type&&(geofs.isArray(g.axis)||(g.axis=AXIS_TO_VECTOR[g.axis]));"wheel"==e.type&&(e.radius=e.radius||1,e.arcDegree=e.radius*TWO_PI/360,e.angularVelocity=0,geofs.aircraft.instance.wheels.push(e));"airfoil"==e.type&&(e.lift=0,geofs.aircraft.instance.airfoils.push(e),e.stalls=e.stalls||!1,e.stallIncidence=e.stallIncidence||12,e.zeroLiftIncidence=e.zeroLiftIncidence||16,e.aspectRatio=e.aspectRatio||DEFAULT_AIRFOIL_ASPECT_RATIO,e.aspectRatioCoefficient=e.aspectRatio/e.aspectRatio+2);"engine"==e.type&&(e.rpm=0,geofs.aircraft.instance.definition.originalInertia=geofs.aircraft.instance.definition.engineInertia,geofs.aircraft.instance.engines.push(e),e.contrail&&(e.contrailEmitter=new geofs.fx.ParticleEmitter({off:!0,anchor:e.points.contrailAnchor,duration:1E10,rate:.05,life:4E4,easing:"easeOutQuart",startScale:.01,endScale:.01,randomizeStartScale:.02,randomizeEndScale:.15,startOpacity:.1,endOpacity:1E-5,startRotation:"random",texture:"whitesmoke"})));"balloon"==e.type&&(e.temperature=e.initialTemperature||0,e.coolingSpeed=e.coolingSpeed||0,geofs.aircraft.instance.balloons.push(e));if(e.collisionPoints){g=e.collisionPoints;f=geofs.aircraft.instance.definition.contactProperties[e.contactType||e.type];for(k=0;k<g.length;k++)g[k].part=e,g[k].contactProperties=f,geofs.aircraft.instance.collisionPoints.push(g[k]);e.volume||e.buoyancy||(e.volume="airfoil"==e.type?this.definition.mass/(400*g.length):.1,e.area=e.area||0);e.dragVector=e.dragVector||[1,1,1];e.dragVector=V3.scale(e.dragVector,1/g.length)}
e.volume&&(e.buoyancy=WATER_DENSITY*GRAVITY*e.volume);e.controller&&(geofs.aircraft.instance.controllers[e.controller.name]=e.controller)}
for(d=0;d<a.length;d++)e=a[d],"root"!=e.name&&(e.parent||(e.parent="root"),geofs.aircraft.instance.parts[e.parent].object3d.addChild(e.object3d)),e.node&&(e.object3d.setModel(e.object3d.findModelInAncestry()),e.manipulator&&(b=e.manipulator,"string"===typeof b&&(geofs.utils.getFunctionFromString(b)),b&&(geofs.aircraft.instance.manipulators[e.node]=b,controls.addNodeClickHandler(e.node,function(m){controls.manipulator=geofs.aircraft.instance.manipulators[m];controls.mouse.down=4}))));`
        addons.manips ? AddPart+='manipulators.checkCommunity();' : null
        AddPart+='}'

        let controlsUpdate = `controls.update=function(a){controls.updateKeyboard(a);"joystick"==controls.mode&&controls.updateJoystick(a);if(!geofs.autopilot.on){controls.states.elevatorTrimUp?controls.trimUp(2*a):controls.states.elevatorTrimDown&&controls.trimDown(2*a);controls.elevatorTrim=clamp(controls.elevatorTrim,controls.elevatorTrimMin,controls.elevatorTrimMax);"mouse"!=controls.mode&&"touch"!=controls.mode||controls.keyboard.override||controls.updateMouse(a);"orientation"==controls.mode&&controls.updateOrientation(a);"touch"==controls.mode&&controls.updateTouch(a);var b=controls.exponential;controls.keyboard.override&&(b=controls.keyboard.exponential);controls.roll*=controls.multiplier.roll;controls.rawPitch*=controls.multiplier.pitch;controls.yaw*=controls.multiplier.yaw;controls.roll*=Math.pow(Math.abs(controls.roll),b);controls.rawPitch*=Math.pow(Math.abs(controls.rawPitch),b);controls.rawYaw=controls.yaw;controls.mixYawRoll?controls.yaw=controls.roll*controls.mixYawRollQuantity:(controls.keyboard.overrideRudder&&(b=geofs.preferences.keyboard.exponential),controls.yaw*=Math.pow(Math.abs(controls.yaw),b),controls.rawYaw=controls.yaw)}
controls.roll=clamp(controls.roll,-1,1);controls.rawPitch=clamp(controls.rawPitch,-1,1);controls.yaw=clamp(controls.yaw,-1,1);controls.pitch=controls.rawPitch+controls.elevatorTrim;b=0;geofs.aircraft.instance.definition.reverse&&(b=-1,0<controls.throttle&&(controls.reverse=0));controls.throttle=controls.throttleAsReverse?clamp(-controls.throttle,b,0):clamp(controls.throttle-controls.reverse,b,1);controls.animatePart("gear",a);controls.animatePart("flaps",a);controls.animatePart("airbrakes",a);controls.animatePart("optionalAnimatedPart",a);controls.animatePart("accessories",a);`
        addons.maritime ? controlsUpdate+='animateMain(a)' : null
        controlsUpdate+='}'

        let textureURL = `geofs.fx.texture2url = {smoke: "images/particles/smoke-light.png",whitesmoke: "images/particles/smoke-white.png",darkSmoke: "images/particles/smoke-dark.png",contrails: "images/particles/contrails.png",1: "images/lights/yellowflare.png",2: "images/lights/redflare.png",3: "images/lights/greenflare.png",white: "images/lights/whitelight.png",red: "images/lights/redlight.png",green: "images/lights/greenlight.png",whitepapi: "images/lights/whitepapi.png",redpapi: "images/lights/redpapi.png"`
        addons.maritime ? textureURL+=`,blue: "https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Extra-Maritime-Structures/main/lights/bluepapi.png",orange: 'https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Extra-Maritime-Structures/main/lights/orangepapi.png'` : null
        addons.smoke ? textureURL+=`,blueSmoke: "https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Airshow-Smoke-Addon/main/smokes/blue%20smoke.png", redSmoke:"https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Airshow-Smoke-Addon/main/smokes/red%20smoke.png", yellowSmoke:"https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Airshow-Smoke-Addon/main/smokes/yellow%20smoke.png", greenSmoke:"https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Airshow-Smoke-Addon/main/smokes/green%20smoke.png"` : null
        textureURL+='}'

        let itv = setInterval(
            function () {
                try {
                    if (window.ui && window.flight) {
                        main()
                        clearInterval(itv);
                    }

                } catch (err) { }
            }, 10);

        function main(){
            eval(TouchNode)
            eval(AddPart)
            eval(controlsUpdate)
            eval(textureURL)
        }
    }

