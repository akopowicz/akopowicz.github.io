import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6
// Thanks to all the people who proposed and implemented JSON modules and Import Assertions. Since
//Chrome 91, you can import JSON directly, for example:
//import fontHelvetiker from "three/examples/fonts/helvetiker_bold.typeface.json" assert { type: "json" };;

class GeometryHelper {
  createSimpleCube = ({
    width = 1,
    height = 1,
    depth = 1,
    numSegments = 3,
    color = 0x00ff00,
    wireframe = false,
    material = null,
  } = {}) => {
    let geometry = new THREE.BoxGeometry(
      width,
      height,
      depth,
      numSegments, // na osi x
      numSegments, // y
      numSegments // z
    );

    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      });
    }

    return new THREE.Mesh(geometry, material);
  };

  createSimpleSphere = ({
    radius = 1, // promień sfery
    widthSegments = 16,
    heightSegments = 16,
    color = 0x00ff00,
    wireframe = false,
    material = null,
  } = {}) => {
    const sphereGeomtery = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // jeśli nie ma materiału usera
    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      });
    }

    return new THREE.Mesh(sphereGeomtery, material);
  };

  createSimpleTorus = ({
    radius = 1,
    tubeRadius = 0.4,
    radialSegments = 16,
    tubularSegments = 16,
    arc = Math.PI * 2, // 360 stopni w radianach
    color = 0xffff00,
    wireframe = false,
    material = null,
  } = {}) => {
    const torusGeometry = new THREE.TorusGeometry(
      radius,
      tubeRadius,
      radialSegments,
      tubularSegments,
      arc
    );

    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      });
    }

    return new THREE.Mesh(torusGeometry, material);
  };

  createSimpleCylinder = ({
    radiusTop = 1, // promień na górze
    radiusBottom = 1,
    height = 1,
    radialSegments = 12,
    heightSegments = 12,
    color = 0xfff0ff,
    wireframe = false,
    material = null,
  } = {}) => {
    const cylinderGeometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments
    );

    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      });
    }

    return new THREE.Mesh(cylinderGeometry, material);
  };

  createSimplePlane = ({
    width = 1,
    height = 1,
    widthSegments = 1,
    heightSegments = 1,
    color = 0x00ffff,
    wireframe = false,
    material = null,
    side = THREE.DoubleSide, // FrontSide, BackSide
  } = {}) => {
    const planeGeometry = new THREE.PlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );

    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: color,
        side: side,
        wireframe: wireframe,
      });
    }

    return new THREE.Mesh(planeGeometry, material);
  };

  // stożek
  createSimpleCone = ({
    radius = 1,
    height = 1,
    radialSegments = 8,
    heightSegments = 20,
    color = 0xffff00,
    wireframe = false,
    material = null,
  } = {}) => {
    const coneGeometry = new THREE.ConeGeometry(
      radius,
      height,
      radialSegments,
      heightSegments
    );

    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
      });
    }

    return new THREE.Mesh(coneGeometry, material);
  };

  // losowe kolory wierzchołków w cube
  createCubeWithRandomVertexColors = ({
    width = 1,
    height = 1,
    depth = 1,
  } = {}) => {
    const boxGeometry = new THREE.BoxGeometry(
      width,
      height,
      depth
    ).toNonIndexed();
    // geometria składa się z unikalnych wierzchołków
    // a nie współdzielonych

    const boxMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true, // wymagane dla shadera
    });

    // wierzchołki
    const positionAttribute = boxGeometry.getAttribute("position");

    const colors = [];

    const color = new THREE.Color();

    for (let i = 0; i < positionAttribute.count; i += 3) {
      // losowy kolor
      let r = color.set(Math.random() * 0xffffff).r;
      let g = color.set(Math.random() * 0xffffff).g;
      let b = color.set(Math.random() * 0xffffff).b;

      colors.push(r, g, b);
      colors.push(g, b, r);
      colors.push(b, g, r);
    }

    boxGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    return new THREE.Mesh(boxGeometry, boxMaterial);
  };

  create3dText = ({
    str = "Hello Three.js!",
    fontUrl = "../node_modules/three/examples/fonts/helvetiker_bold.typeface.json",
    color = 0xffd500,
    size = 2,
    height = 1,
    curveSegments = 12,
    callbackReady,
    wireframe = false,
    centerText = false,
    material = null,
  } = {}) => {
    if (!this.fontLoader) {
      this.fontLoader = new FontLoader();
    }

    this.fontLoader.load(
      fontUrl,

      // onLoad callback
      function (font) {
        console.log("font załadowany");

        const textGeometry = new TextGeometry(str, {
          font: font,
          size: size, // wielkość czcionki
          height: height, // wysokość
          curveSegments: curveSegments,
        });

        if (!material) {
          material = new THREE.MeshPhongMaterial({
            color: color,
            wireframe: wireframe,
          });
        }

        const text3d = new THREE.Mesh(textGeometry, material);

        if (centerText) {
          // obliczenie wycentrowania bounding box
          textGeometry.computeBoundingBox();
          textGeometry.translate(
            -textGeometry.boundingBox.max.x * 0.5, // oś x
            -textGeometry.boundingBox.max.y * 0.5, // oś y
            -textGeometry.boundingBox.max.z * 0.5 // oś z
          );
        }

        callbackReady(text3d);
      },

      function (xhr) {
        // postęp ładowania
      },

      function (err) {
        console.log("Błąd ładowania czcionki", err);
      }
    );
  };

  createAxesHelper = (length) => {
    const axes = new THREE.AxesHelper(length);
    axes.material.depthTest = false; // wyłączamy bufor z
    axes.renderOrder = 1; // zawsze axes będą malowane po sferze
    return axes;
  };

  getTexture = ({
    textureUrl = "../../assets/textures/uv.png",
    textureRepeatX = 1,
    textureRepeatY = 1,
    textureWrapS = THREE.RepeatWrapping, // THREE.MirroredRepeatWrapping
    textureWrapT = THREE.RepeatWrapping, // THREE.RepeatWrapping
    textureRotation = 0,
    textureCenterX = 0,
    textureCenterY = 0,
    textureOffsetX = 0,
    textureOffsetY = 0,
  } = {}) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureUrl);

    // ile razy tekstura ma być powtarzana
    // działa tylko z THREE.RepeatWrapping
    texture.repeat.x = textureRepeatX;
    texture.repeat.y = textureRepeatY;
    //texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;
    // THREE.MirroredRepeatWrapping - lustrzane odbicie powtarzając
    texture.wrapS = textureWrapS;
    texture.wrapT = textureWrapT;

    // obrót tekstury w radianach względem punktu UV 0,0
    texture.rotation = textureRotation;

    // można zmienić punkt obrotu dzięki center.x center.y
    // 0.5  0.5  to środek
    texture.center.x = textureCenterX;
    texture.center.y = textureCenterY;

    // offest, przesunięcie tekstury
    // przesunięcie w prawo o połowę tekstury
    texture.offset.x = textureOffsetX;
    texture.offset.y = textureOffsetY;

    return texture;
  };

  // oteksturowany sześcian
  createTexturedCube = ({
    width = 1,
    height = 1,
    depth = 1,
    numSegments = 3,
    texture = null,
  } = {}) => {
    if (!texture) {
      texture = this.getTexture();
    }

    let geometry = new THREE.BoxGeometry(
      width,
      height,
      depth,
      numSegments, // na osi x
      numSegments, // y
      numSegments // z
    );

    // można ustawić atrybut UV jeśli chcemy mieć większą kontrolę
    //console.log(geometry.attributes.uv);

    let boxMaterial = new THREE.MeshPhongMaterial({
      map: texture,
    });

    return new THREE.Mesh(geometry, boxMaterial);
  };

  loadTexture = ({
    textureUrl = "../../assets/textures/uv.png",
    textureRepeatX = 1,
    textureRepeatY = 1,
    textureWrapS = THREE.RepeatWrapping, // THREE.MirroredRepeatWrapping
    textureWrapT = THREE.RepeatWrapping, // THREE.RepeatWrapping
    textureRotation = 0,
    textureCenterX = 0,
    textureCenterY = 0,
    textureOffsetX = 0,
    textureOffsetY = 0,
  } = {}) => {
    const textureLoader = new THREE.TextureLoader();
    const texture1Url = textureUrl;

    const texture1 = textureLoader.load(texture1Url);
    texture1.repeat.x = textureRepeatX;
    texture1.repeat.y = textureRepeatY;

    texture1.wrapS = textureWrapS;
    texture1.wrapT = textureWrapT;

    texture1.rotation = textureRotation;

    // texture1.rotation = Math.PI / 4;
    texture1.center.x = textureCenterX;
    texture1.center.y = textureCenterY;

    texture1.offset.x = textureOffsetX;
    texture1.offset.y = textureOffsetY;

    return texture1;
  };
}

export { GeometryHelper };
