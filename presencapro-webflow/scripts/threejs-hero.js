/**
 * PresençaPro — Three.js Hero Orb
 * ─────────────────────────────────────────────────────────────────
 * Inserir antes do </body> na página Home (Page Settings → Custom Code)
 * 
 * HTML necessário no Webflow:
 *   <div data-el="hero-canvas-wrapper" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
 *     <canvas id="hero-canvas" style="width:100%;height:100%;display:block;opacity:0;transition:opacity 1s;"></canvas>
 *   </div>
 * 
 * Mobile: canvas fica oculto; gradient CSS animado substitui.
 * ─────────────────────────────────────────────────────────────────
 */

(function() {
  'use strict';

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Em mobile ou reduced motion: usar apenas CSS animado, não carregar Three
  if (isMobile || prefersReducedMotion) {
    applyMobileFallback();
    return;
  }

  // ─── Lazy load do Three.js ────────────────────────────────────────────────
  function loadScript(src, onload) {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = onload;
    document.head.appendChild(s);
  }

  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    initThree
  );

  // ─── Fallback mobile ─────────────────────────────────────────────────────
  function applyMobileFallback() {
    const wrapper = document.querySelector('[data-el="hero-canvas-wrapper"]');
    if (!wrapper) return;
    
    Object.assign(wrapper.style, {
      background: `
        radial-gradient(ellipse 70% 60% at 50% 20%, rgba(255,107,0,0.10) 0%, transparent 70%),
        radial-gradient(ellipse 40% 40% at 80% 60%, rgba(255,107,0,0.05) 0%, transparent 60%)
      `,
      animation: prefersReducedMotion ? 'none' : 'heroGradientPulse 6s ease-in-out infinite'
    });

    // Inject keyframe if not present
    if (!document.getElementById('pp-hero-keyframes')) {
      const style = document.createElement('style');
      style.id = 'pp-hero-keyframes';
      style.textContent = `
        @keyframes heroGradientPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ─── Three.js init ────────────────────────────────────────────────────────
  function initThree() {
    if (typeof THREE === 'undefined') { applyMobileFallback(); return; }

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) { return; }

    const wrapper = canvas.parentElement;
    const W = wrapper.offsetWidth;
    const H = wrapper.offsetHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap at 1.5x

    // ── Scene ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.z = 4.5;

    // ── Shader Material (orb glowing) ──
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289((x*34.0+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0*floor(p*ns.z*ns.z);
        vec4 x_ = floor(j*ns.z);
        vec4 y_ = floor(j-7.0*x_);
        vec4 x = x_*ns.x+ns.yyyy;
        vec4 y = y_*ns.x+ns.yyyy;
        vec4 h = 1.0-abs(x)-abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0+1.0;
        vec4 s1 = floor(b1)*2.0+1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
        m = m*m;
        return 42.0*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }

      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        float n = snoise(pos * 1.5 + uTime * 0.15);
        pos += normal * n * 0.18; // subtle distortion
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec3 uColorA; // core
      uniform vec3 uColorB; // edge

      void main() {
        // Fresnel glow
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(normalize(vNormal), viewDir), 3.0);

        // Base color mixing
        float t = vUv.y + sin(vUv.x * 3.14 + uTime * 0.3) * 0.1;
        vec3 color = mix(uColorA, uColorB, t);
        
        // Bright core
        color += vec3(1.0, 0.6, 0.2) * fresnel * 0.6;
        
        // Alpha: visible sphere with soft edges
        float alpha = 0.15 + fresnel * 0.5;
        alpha = clamp(alpha, 0.0, 0.85);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#FF6B00') },
        uColorB: { value: new THREE.Color('#0F0F0F') },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orb = new THREE.Mesh(geometry, material);
    orb.position.set(2.0, 0.0, 0.0); // ligeiramente à direita
    scene.add(orb);

    // Anel de partículas (grid sutil)
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI;
      const r     = 1.8 + Math.random() * 1.2;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xFF6B00,
      size: 0.015,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeom, pMat);
    orb.add(particles);

    // ── Interatividade com rato ──
    const mouse = new THREE.Vector2();
    let targetX = 0, targetY = 0;
    document.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
      targetX = mouse.x * 0.4;
      targetY = mouse.y * -0.3;
    });

    // ── Fade-in canvas ──
    canvas.style.opacity = '1';

    // ── Resize handler ──
    let raf;
    function onResize() {
      const W2 = wrapper.offsetWidth;
      const H2 = wrapper.offsetHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    }
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      material.uniforms.uTime.value = t;
      
      // Rotação lenta
      orb.rotation.y = t * 0.08;
      orb.rotation.x = t * 0.04;

      // Seguir rato com lag
      orb.rotation.y += (targetX - orb.rotation.y) * 0.03;
      orb.rotation.x += (targetY - orb.rotation.x) * 0.03;

      // Float sutil
      orb.position.y = Math.sin(t * 0.4) * 0.15;

      renderer.render(scene, camera);
    }
    animate();

    // ── Cleanup ao sair (não necessário em SPA Webflow mas boa prática) ──
    // window.addEventListener('beforeunload', () => {
    //   cancelAnimationFrame(raf);
    //   renderer.dispose();
    // });
  }

})();
