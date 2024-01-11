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

        let AddPart = `geofs.aircraft.Aircraft.prototype.addParts=function(e,n,t,i){for(i=0,t=t||1;i<e.length;i++){var a=e[i];if(a.include){var o=geofs.includes[a.include];$.extend(!0,a,o[0]);for(var s=1;s<o.length;s++){var r=Object.assign({},o[s],{parent:a.name});r.name=a.name+r.name,e.push(r)}}if(a.indices&&0<a.indices){for(s=2;s<=a.indices;s++)(r=Object.assign({},a,{indices:null})).name=a.name+s,r.node+=s,e.push(r);a.name+="1",a.node+="1"}}for(i=0;i<e.length;i++){for((a=e[i]).points=a.points||{},a.type=a.type||!1,a.brakesController=a.brakesController||!1,a.animations=a.animations||[],geofs.aircraft.instance.parts[a.name]=a,geofs.aircraft.instance.addOffsets(a,t),a.forceDirection&&(a.forceDirection=AXIS_TO_INDEX[a.forceDirection]),a.rotation&&(a.rotation=V3.toRadians(a.rotation)),a.modelOnlyRotation&&(a.modelOnlyRotation=V3.toRadians(a.modelOnlyRotation)),a.scale=a.scale||[1,1,1],a.scale=V3.scale(a.scale,t),a.originalScale=a.scale,4>geofs.version&&(a.gltf2model=null),(a.model||a.gltf2model)&&(o=a.gltf2model?a.gltf2model.url:a.model.url||a.model,n&&"/"!=o[0]&&!a.include&&(o=n+o),s={shadows:a.shadows?window[a.shadows]:SHADOWS_ALL,incrementallyLoadTextures:!1},a.gltf2model&&a.gltf2model.shader&&(s.customShader=geofs.api.generateShader(a.model.shader,n)),a["3dmodel"]=new geofs.api.Model(o,s),this.models.push(a["3dmodel"]._model),a.renderer&&(a.rendererInstance=new instruments.Renderer(a.renderer))),a.light&&(a.lightBillboard=new geofs.fx.light(null,a.light,{scale:.2}),geofs.aircraft.instance.lights.push(a)),a.object3d=new Object3D(a),a.suspension&&(a.suspension.length?(a.suspension.origin=[a.collisionPoints[0][0],a.collisionPoints[0][1],a.collisionPoints[0][2]+a.suspension.length],o=a.suspension.length):(a.suspension.origin=[a.collisionPoints[0][0],a.collisionPoints[0][1],0],o=-a.collisionPoints[0][2]),a.suspension.restLength=o,"rotation"==a.suspension.motion?(o=V3.length(a.collisionPoints[0]),o=Math.atan2(a.collisionPoints[0][0]/o,a.collisionPoints[0][2]/o),o={type:"rotate",axis:a.suspension.axis||"Y",value:a.name+"Suspension",ratio:(0>o?o+HALF_PI:o-HALF_PI)*RAD_TO_DEGREES*(a.suspension.ratio||1)}):o={type:"translate",axis:a.suspension.axis||"Z",value:a.name+"Suspension",ratio:a.suspension.ratio||1},a.animations.push(o),a.suspension.hardPoint=a.suspension.hardPoint||.5,a.points.suspensionOrigin=V3.dup(a.suspension.origin),geofs.aircraft.instance.suspensions.push(a)),s=0;s<a.animations.length;s++)(o=a.animations[s]).ratio=o.ratio||1,o.offset=o.offset||0,o.currentValue=null,o.delay&&(o.ratio/=1-Math.abs(o.delay)),"rotate"==o.type&&(r=o.method||"rotate","parent"==o.frame&&(r="rotateParentFrame"),o.rotationMethod=a.object3d[r+o.axis]),"translate"==o.type&&(geofs.isArray(o.axis)||(o.axis=AXIS_TO_VECTOR[o.axis]));if("wheel"==a.type&&(a.radius=a.radius||1,a.arcDegree=a.radius*TWO_PI/360,a.angularVelocity=0,geofs.aircraft.instance.wheels.push(a)),"airfoil"==a.type&&(a.lift=0,geofs.aircraft.instance.airfoils.push(a),a.stalls=a.stalls||!1,a.stallIncidence=a.stallIncidence||12,a.zeroLiftIncidence=a.zeroLiftIncidence||16,a.aspectRatio=a.aspectRatio||DEFAULT_AIRFOIL_ASPECT_RATIO,a.aspectRatioCoefficient=a.aspectRatio/a.aspectRatio+2),"engine"==a.type&&(a.rpm=0,geofs.aircraft.instance.definition.originalInertia=geofs.aircraft.instance.definition.engineInertia,geofs.aircraft.instance.engines.push(a),a.contrail&&(a.contrailEmitter=new geofs.fx.ParticleEmitter({off:!0,anchor:a.points.contrailAnchor,duration:1e10,rate:.05,life:4e4,easing:"easeOutQuart",startScale:.01,endScale:.01,randomizeStartScale:.02,randomizeEndScale:.15,startOpacity:.1,endOpacity:1e-5,startRotation:"random",texture:"whitesmoke"}))),"balloon"==a.type&&(a.temperature=a.initialTemperature||0,a.coolingSpeed=a.coolingSpeed||0,geofs.aircraft.instance.balloons.push(a)),a.collisionPoints){for(r=0,o=a.collisionPoints,s=geofs.aircraft.instance.definition.contactProperties[a.contactType||a.type];r<o.length;r++)o[r].part=a,o[r].contactProperties=s,geofs.aircraft.instance.collisionPoints.push(o[r]);a.volume||a.buoyancy||(a.volume="airfoil"==a.type?this.definition.mass/(400*o.length):.1,a.area=a.area||0),a.dragVector=a.dragVector||[1,1,1],a.dragVector=V3.scale(a.dragVector,1/o.length)}a.volume&&(a.buoyancy=WATER_DENSITY*GRAVITY*a.volume),a.controller&&(geofs.aircraft.instance.controllers[a.controller.name]=a.controller)}for(i=0;i<e.length;i++)"root"!=(a=e[i]).name&&(a.parent||(a.parent="root"),geofs.aircraft.instance.parts[a.parent].object3d.addChild(a.object3d)),a.node&&(a.object3d.setModel(a.object3d.findModelInAncestry()),a.manipulator&&("string"==typeof(n=a.manipulator)&&(n=geofs.aircraft.instance.aircraftRecord.isCommunity?null:geofs.utils.getFunctionFromString(n)),n&&(geofs.aircraft.instance.manipulators[a.node]=n,controls.addNodeClickHandler(a.node,function(e){controls.manipulator=geofs.aircraft.instance.manipulators[e],controls.mouse.down=4}))))};`
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

