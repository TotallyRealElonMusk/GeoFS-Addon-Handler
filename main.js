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
        TouchNode+=`for(var d in controls.nodeClickHandlers)d==n&&controls.nodeClickHandlers[d](n)};`

        let AddPart = `geofs.aircraft.Aircraft.prototype.addParts=function(e,n,o,t){for(o=o||1,t=0;t<e.length;t++){var i=e[t];if(i.include){var a=geofs.includes[i.include];$.extend(!0,i,a[0]);for(var s=1;s<a.length;s++){var r=Object.assign({},a[s],{parent:i.name});r.name=i.name+r.name,e.push(r)}}if(i.indices&&0<i.indices){for(s=2;s<=i.indices;s++)(r=Object.assign({},i,{indices:null})).name=i.name+s,r.node+=s,e.push(r);i.name+="1",i.node+="1"}}for(t=0;t<e.length;t++){for((i=e[t]).points=i.points||{},i.type=i.type||!1,i.brakesController=i.brakesController||!1,i.animations=i.animations||[],geofs.aircraft.instance.parts[i.name]=i,geofs.aircraft.instance.addOffsets(i,o),i.forceDirection&&(i.forceDirection=AXIS_TO_INDEX[i.forceDirection]),i.rotation&&(i.rotation=V3.toRadians(i.rotation)),i.modelOnlyRotation&&(i.modelOnlyRotation=V3.toRadians(i.modelOnlyRotation)),i.scale=i.scale||[1,1,1],i.scale=V3.scale(i.scale,o),i.originalScale=i.scale,4>geofs.version&&(i.gltf2model=null),(i.model||i.gltf2model)&&(a=i.gltf2model?i.gltf2model.url:i.model.url||i.model,n&&"/"!=a[0]&&!i.include&&(a=n+a),s={shadows:i.shadows?window[i.shadows]:SHADOWS_ALL,incrementallyLoadTextures:!1},i.gltf2model&&i.gltf2model.shader&&(s.customShader=geofs.api.generateShader(i.model.shader,n)),i["3dmodel"]=new geofs.api.Model(a,s),this.models.push(i["3dmodel"]._model),i.renderer&&(i.rendererInstance=new instruments.Renderer(i.renderer))),i.light&&(i.lightBillboard=new geofs.fx.light(null,i.light,{scale:.2}),geofs.aircraft.instance.lights.push(i)),i.object3d=new Object3D(i),i.suspension&&(i.suspension.length?(i.suspension.origin=[i.collisionPoints[0][0],i.collisionPoints[0][1],i.collisionPoints[0][2]+i.suspension.length],a=i.suspension.length):(i.suspension.origin=[i.collisionPoints[0][0],i.collisionPoints[0][1],0],a=-i.collisionPoints[0][2]),i.suspension.restLength=a,"rotation"==i.suspension.motion?(a=V3.length(i.collisionPoints[0]),a=Math.atan2(i.collisionPoints[0][0]/a,i.collisionPoints[0][2]/a),a={type:"rotate",axis:i.suspension.axis||"Y",value:i.name+"Suspension",ratio:(0>a?a+HALF_PI:a-HALF_PI)*RAD_TO_DEGREES*(i.suspension.ratio||1)}):a={type:"translate",axis:i.suspension.axis||"Z",value:i.name+"Suspension",ratio:i.suspension.ratio||1},i.animations.push(a),i.suspension.hardPoint=i.suspension.hardPoint||.5,i.points.suspensionOrigin=V3.dup(i.suspension.origin),geofs.aircraft.instance.suspensions.push(i)),s=0;s<i.animations.length;s++)(a=i.animations[s]).ratio=a.ratio||1,a.offset=a.offset||0,a.currentValue=null,a.delay&&(a.ratio/=1-Math.abs(a.delay)),"rotate"==a.type&&(r=a.method||"rotate","parent"==a.frame&&(r="rotateParentFrame"),a.rotationMethod=i.object3d[r+a.axis]),"translate"==a.type&&(geofs.isArray(a.axis)||(a.axis=AXIS_TO_VECTOR[a.axis]));if("wheel"==i.type&&(i.radius=i.radius||1,i.arcDegree=i.radius*TWO_PI/360,i.angularVelocity=0,geofs.aircraft.instance.wheels.push(i)),"airfoil"==i.type&&(i.lift=0,geofs.aircraft.instance.airfoils.push(i),i.stalls=i.stalls||!1,i.stallIncidence=i.stallIncidence||12,i.zeroLiftIncidence=i.zeroLiftIncidence||16,i.aspectRatio=i.aspectRatio||DEFAULT_AIRFOIL_ASPECT_RATIO,i.aspectRatioCoefficient=i.aspectRatio/i.aspectRatio+2),"engine"==i.type&&(i.rpm=0,geofs.aircraft.instance.definition.originalInertia=geofs.aircraft.instance.definition.engineInertia,geofs.aircraft.instance.engines.push(i),i.contrail&&(i.contrailEmitter=new geofs.fx.ParticleEmitter({off:!0,anchor:i.points.contrailAnchor,duration:1e10,rate:.05,life:4e4,easing:"easeOutQuart",startScale:.01,endScale:.01,randomizeStartScale:.02,randomizeEndScale:.15,startOpacity:.1,endOpacity:1e-5,startRotation:"random",texture:"whitesmoke"}))),"balloon"==i.type&&(i.temperature=i.initialTemperature||0,i.coolingSpeed=i.coolingSpeed||0,geofs.aircraft.instance.balloons.push(i)),i.collisionPoints){for(a=i.collisionPoints,s=geofs.aircraft.instance.definition.contactProperties[i.contactType||i.type],r=0;r<a.length;r++)a[r].part=i,a[r].contactProperties=s,geofs.aircraft.instance.collisionPoints.push(a[r]);i.volume||i.buoyancy||(i.volume="airfoil"==i.type?this.definition.mass/(400*a.length):.1,i.area=i.area||0),i.dragVector=i.dragVector||[1,1,1],i.dragVector=V3.scale(i.dragVector,1/a.length)}i.volume&&(i.buoyancy=WATER_DENSITY*GRAVITY*i.volume),i.controller&&(geofs.aircraft.instance.controllers[i.controller.name]=i.controller)}for(t=0;t<e.length;t++)"root"!=(i=e[t]).name&&(i.parent||(i.parent="root"),geofs.aircraft.instance.parts[i.parent].object3d.addChild(i.object3d)),i.node&&(i.object3d.setModel(i.object3d.findModelInAncestry()),i.manipulator&&("string"==typeof(n=i.manipulator)&&(n=geofs.aircraft.instance.aircraftRecord.isCommunity?null:geofs.utils.getFunctionFromString(n)),n&&(geofs.aircraft.instance.manipulators[i.node]=n,controls.addNodeClickHandler(i.node,(function(e){controls.manipulator=geofs.aircraft.instance.manipulators[e],controls.mouse.down=4})))));`
        addons.manips ? AddPart+='manipulators.checkCommunity();' : null
        AddPart+='}'
        console.log(AddPart)

        let controlsUpdate = `controls.update = function(a){try {controls.updateKeyboard(a);}catch (c){geofs.debug.error(c, "controls.updateTouch");}if ("joystick" == controls.mode)try {       controls.updateJoystick(a);}catch (c){       geofs.debug.error(c, "controls.updateJoystick");}if ( ! geofs.autopilot.on){controls.states.elevatorTrimUp ? (controls.trimUp(), controls.setters.setElevatorTrimUp.unset()): controls.states.elevatorTrimDown && (controls.trimDown(), controls.setters.setElevatorTrimDown.unset());if (("mouse" == controls.mode || "touch" == controls.mode) && ! controls.keyboard.override)try {controls.updateMouse(a);}catch (c){geofs.debug.error(c, "controls.updateMouse");}if ("orientation" == controls.mode)try {controls.updateOrientation(a);}catch (c){geofs.debug.error(c, "controls.updateOrientation");}if ("touch" == controls.mode)try {controls.updateTouch(a);}catch (c){geofs.debug.error(c, "controls.updateTouch");}var b = controls.exponential;controls.keyboard.override && (b = controls.keyboard.exponential);controls.roll *= controls.multiplier.roll;controls.rawPitch *= controls.multiplier.pitch;controls.yaw *= controls.multiplier.yaw;controls.roll *= Math.pow(Math.abs(controls.roll), b);controls.rawPitch *= Math.pow(Math.abs(controls.rawPitch), b);controls.rawYaw = controls.yaw;controls.mixYawRoll ? controls.yaw = controls.roll * controls.mixYawRollQuantity: (controls.keyboard.overrideRudder && (b = geofs.preferences.keyboard.exponential), controls.yaw *= Math.pow(Math.abs(controls.yaw), b), controls.rawYaw = controls.yaw);}controls.roll = clamp(controls.roll, - 1, 1);controls.rawPitch = clamp(controls.rawPitch, - 1, 1);controls.yaw = clamp(controls.yaw, - 1, 1);controls.pitch = controls.rawPitch + controls.elevatorTrim;b = 0;geofs.aircraft.instance.definition.reverse && (b = - 1, 0 < controls.throttle && (controls.reverse = 0));controls.throttle = controls.throttleAsReverse ? clamp( - controls.throttle, b, 0): clamp(controls.throttle - controls.reverse, b, 1);controls.animatePart("gear", a);controls.animatePart("flaps", a);controls.animatePart("airbrakes", a);controls.animatePart("optionalAnimatedPart", a);controls.animatePart("accessories", a);`     
        addons.maritime ? controlsUpdate+='animateMain();' : null
        controlsUpdate+='}'

        let textureURL = `geofs.fx.texture2url={smoke:"images/particles/smoke-light.png",whitesmoke:"images/particles/smoke-white.png",darkSmoke:"images/particles/smoke-dark.png",contrails:"images/particles/contrails.png",1:"images/lights/yellowflare.png",2:"images/lights/redflare.png",3:"images/lights/greenflare.png",white:"images/lights/whitelight.png",red:"images/lights/redlight.png",green:"images/lights/greenlight.png",whitepapi:"images/lights/whitepapi.png",redpapi:"images/lights/redpapi.png"`
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

