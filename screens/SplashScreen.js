import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const RING = clamp(width * 0.64, 240, 340);

function WarpTunnel({ opacity }) {
  // Creates a "travel forward" illusion: expanding rings + star streaks, looping.
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(t, {
          toValue: 1,
          duration: 1700,
          useNativeDriver: true,
        }),
        Animated.timing(t, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [t]);

  const centerLeft = (width - RING) / 2;
  const centerTop = height * 0.30 - RING / 2;

  const rings = useMemo(() => {
    // each ring has its own offset so they appear at different "depths"
    return [
      { k: 0.00, w: 0.50, o: 0.18 },
      { k: 0.16, w: 0.62, o: 0.14 },
      { k: 0.32, w: 0.74, o: 0.12 },
      { k: 0.48, w: 0.86, o: 0.10 },
      { k: 0.64, w: 0.98, o: 0.09 },
    ];
  }, []);

  const streaks = useMemo(() => {
    // star streaks positioned around the tunnel; they move outwards and fade
    return [
      { x: -RING * 0.22, y: -RING * 0.10, s: 0.9, o: 0.18 },
      { x: RING * 0.10, y: -RING * 0.26, s: 0.8, o: 0.14 },
      { x: RING * 0.28, y: -RING * 0.02, s: 1.0, o: 0.16 },
      { x: -RING * 0.30, y: RING * 0.08, s: 0.8, o: 0.13 },
      { x: RING * 0.22, y: RING * 0.18, s: 0.9, o: 0.14 },
      { x: -RING * 0.06, y: RING * 0.30, s: 0.8, o: 0.12 },
      { x: RING * 0.02, y: -RING * 0.06, s: 0.7, o: 0.10 },
    ];
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.tunnelStage,
        {
          opacity,
          left: centerLeft,
          top: centerTop,
          width: RING,
          height: RING,
        },
      ]}
    >
      {/* Expanding rings */}
      {rings.map((r, idx) => {
        const local = Animated.modulo(Animated.add(t, r.k), 1);

        const scale = local.interpolate({
          inputRange: [0, 1],
          outputRange: [0.25, 1.55],
        });

        const ringOpacity = local.interpolate({
          inputRange: [0, 0.25, 0.7, 1],
          outputRange: [0, r.o, r.o * 0.8, 0],
        });

        const rotate = local.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", idx % 2 === 0 ? "16deg" : "-16deg"],
        });

        return (
          <Animated.View
            key={`ring-${idx}`}
            style={[
              styles.tunnelRing,
              {
                width: RING * r.w,
                height: RING * r.w,
                borderRadius: (RING * r.w) / 2,
                opacity: ringOpacity,
                transform: [{ scale }, { rotate }],
              },
            ]}
          />
        );
      })}

      {/* Star streaks */}
      {streaks.map((st, idx) => {
        const local = Animated.modulo(Animated.add(t, idx * 0.13), 1);

        const driftX = local.interpolate({
          inputRange: [0, 1],
          outputRange: [st.x * 0.1, st.x * 1.25],
        });

        const driftY = local.interpolate({
          inputRange: [0, 1],
          outputRange: [st.y * 0.1, st.y * 1.25],
        });

        const stretch = local.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [0.8, 1.25, 1.0],
        });

        const streakOpacity = local.interpolate({
          inputRange: [0, 0.25, 0.8, 1],
          outputRange: [0, st.o, st.o * 0.8, 0],
        });

        return (
          <Animated.View
            key={`streak-${idx}`}
            style={[
              styles.streak,
              {
                opacity: streakOpacity,
                transform: [
                  { translateX: driftX },
                  { translateY: driftY },
                  { scaleX: stretch },
                ],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
}

function NeonPortal({ opacity }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const arcRot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    );
    pulseLoop.start();

    const arcLoop = Animated.loop(
      Animated.timing(arcRot, { toValue: 1, duration: 2400, useNativeDriver: true })
    );
    arcLoop.start();

    return () => {
      pulseLoop.stop();
      arcLoop.stop();
    };
  }, [pulse, arcRot]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.99, 1.03],
  });

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.22, 0.48],
  });

  const rotateArc = arcRot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.portalWrap,
        { opacity, transform: [{ scale }] },
      ]}
    >
      <Animated.View
        style={[
          styles.portalGlow,
          styles.portalGlowBlue,
          { opacity: glowOpacity, transform: [{ scale: 1.18 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.portalGlow,
          styles.portalGlowWarm,
          { opacity: glowOpacity, transform: [{ scale: 1.04 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.portalGlow,
          styles.portalGlowViolet,
          { opacity: glowOpacity, transform: [{ scale: 0.92 }] },
        ]}
      />

      <View style={styles.portalRing} />

      <Animated.View style={[styles.arcWrap, { transform: [{ rotate: rotateArc }] }]}>
        <View style={styles.arc} />
      </Animated.View>

      <View style={styles.portalInner} />
      <View style={styles.portalCore} />
    </Animated.View>
  );
}

function AtomOrbit({ opacity }) {
  const rot1 = useRef(new Animated.Value(0)).current;
  const rot2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.timing(rot1, { toValue: 1, duration: 2200, useNativeDriver: true })
    );
    const loop2 = Animated.loop(
      Animated.timing(rot2, { toValue: 1, duration: 3200, useNativeDriver: true })
    );
    loop1.start();
    loop2.start();

    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [rot1, rot2]);

  const rotate1 = rot1.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const rotate2 = rot2.interpolate({ inputRange: [0, 1], outputRange: ["360deg", "0deg"] });

  return (
    <Animated.View style={[styles.orbitWrap, { opacity }]} pointerEvents="none">
      <Animated.View
        style={[
          styles.orbitRing,
          {
            width: RING * 0.92,
            height: RING * 0.92,
            borderRadius: (RING * 0.92) / 2,
            transform: [{ rotate: rotate1 }],
          },
        ]}
      >
        <View style={[styles.electron, styles.e1]} />
        <View style={[styles.electron, styles.e2]} />
        <View style={[styles.electron, styles.e3]} />
      </Animated.View>

      <Animated.View
        style={[
          styles.orbitRing,
          styles.orbitRingTilt,
          {
            width: RING * 0.80,
            height: RING * 0.80,
            borderRadius: (RING * 0.80) / 2,
            transform: [{ rotate: rotate2 }, { rotateX: "62deg" }],
          },
        ]}
      />
    </Animated.View>
  );
}

export default function SplashScreen({ navigation }) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0.92)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  // Camera push-in right before leaving (feels like travelling forward)
  const camera = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 520, useNativeDriver: true }),
      Animated.spring(pop, { toValue: 1, speed: 14, bounciness: 8, useNativeDriver: true }),
      Animated.timing(subtitleFade, { toValue: 1, duration: 720, delay: 260, useNativeDriver: true }),
    ]).start();

    // Push-in near the end
    const camAnim = Animated.sequence([
      Animated.delay(1050),
      Animated.timing(camera, { toValue: 1, duration: 520, useNativeDriver: true }),
    ]);
    camAnim.start();

    const t = setTimeout(() => {
      navigation.replace("Welcome");
    }, 1750);

    return () => {
      camAnim.stop();
      clearTimeout(t);
    };
  }, [fadeIn, pop, subtitleFade, camera, navigation]);

  const camScale = camera.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const camOpacity = camera.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.92],
  });

  return (
    <LinearGradient colors={["#FFF8E7", "#FFF0D4", "#FFE8C8"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />

        {/* Soft blobs */}
        <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
          <View style={[styles.bgBlob, styles.bgBlob1]} />
          <View style={[styles.bgBlob, styles.bgBlob2]} />
          <View style={[styles.bgBlob, styles.bgBlob3]} />
        </View>

        {/* Everything "travels forward" together */}
        <Animated.View style={{ flex: 1, opacity: camOpacity, transform: [{ scale: camScale }] }}>
          <WarpTunnel opacity={fadeIn} />
          <NeonPortal opacity={fadeIn} />
          <AtomOrbit opacity={fadeIn} />
        </Animated.View>

        {/* Center text */}
        <View style={styles.center}>
          <Animated.View style={{ opacity: fadeIn, transform: [{ scale: pop }] }}>
            <Text style={styles.logoTitle}>SMART SCI AR</Text>
            <Animated.Text style={[styles.logoSub, { opacity: subtitleFade }]}>
              AR Science • Classes 6–12
            </Animated.Text>
          </Animated.View>

          <Animated.Text style={[styles.loadingText, { opacity: subtitleFade }]}>
            Entering the lab…
          </Animated.Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  center: {
    position: "absolute",
    left: 0,
    right: 0,
    top: height * 0.30 + RING * 0.22,
    alignItems: "center",
    paddingHorizontal: 26,
  },

  logoTitle: {
    fontSize: 44,
    fontWeight: "900",
    color: "#2D2015",
    textAlign: "center",
    letterSpacing: 1,
  },
  logoSub: {
    marginTop: 8,
    fontSize: 14.5,
    fontWeight: "700",
    color: "#FF9A56",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 18,
    fontSize: 13.5,
    fontWeight: "600",
    color: "#8B7355",
    textAlign: "center",
  },

  /* Background blobs */
  bgBlob: { position: "absolute", borderRadius: 999 },
  bgBlob1: {
    width: width * 0.90,
    height: width * 0.90,
    left: -width * 0.44,
    top: -width * 0.34,
    backgroundColor: "rgba(255,154,86,0.10)",
  },
  bgBlob2: {
    width: width * 0.82,
    height: width * 0.82,
    right: -width * 0.38,
    top: height * 0.16,
    backgroundColor: "rgba(102,126,234,0.10)",
  },
  bgBlob3: {
    width: width * 0.98,
    height: width * 0.98,
    left: width * 0.08,
    bottom: -width * 0.60,
    backgroundColor: "rgba(255,107,107,0.08)",
  },

  /* Tunnel stage */
  tunnelStage: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  tunnelRing: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(118,75,162,0.20)",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  streak: {
    position: "absolute",
    width: 26,
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  /* Portal */
  portalWrap: {
    position: "absolute",
    left: (width - RING) / 2,
    top: height * 0.30 - RING / 2,
    width: RING,
    height: RING,
    justifyContent: "center",
    alignItems: "center",
  },
  portalGlow: {
    position: "absolute",
    width: RING,
    height: RING,
    borderRadius: RING / 2,
  },
  portalGlowBlue: { backgroundColor: "rgba(102,126,234,0.18)" },
  portalGlowWarm: { backgroundColor: "rgba(255,154,86,0.16)" },
  portalGlowViolet: { backgroundColor: "rgba(118,75,162,0.14)" },

  portalRing: {
    width: RING * 0.88,
    height: RING * 0.88,
    borderRadius: (RING * 0.88) / 2,
    borderWidth: 3,
    borderColor: "rgba(118,75,162,0.34)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  portalInner: {
    position: "absolute",
    width: RING * 0.62,
    height: RING * 0.62,
    borderRadius: (RING * 0.62) / 2,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.30)",
  },
  portalCore: {
    position: "absolute",
    width: RING * 0.40,
    height: RING * 0.40,
    borderRadius: (RING * 0.40) / 2,
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  /* Highlight arc */
  arcWrap: {
    position: "absolute",
    width: RING * 0.92,
    height: RING * 0.92,
    borderRadius: (RING * 0.92) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  arc: {
    position: "absolute",
    width: RING * 0.92,
    height: RING * 0.92,
    borderRadius: (RING * 0.92) / 2,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0)",
    borderTopColor: "rgba(255,255,255,0.45)",
    borderRightColor: "rgba(255,255,255,0.18)",
  },
  
  /* Orbit */
  orbitWrap: {
    position: "absolute",
    left: (width - RING) / 2,
    top: height * 0.30 - RING / 2,
    width: RING,
    height: RING,
    justifyContent: "center",
    alignItems: "center",
  },
  orbitRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(45,32,21,0.08)",
  },
  orbitRingTilt: {
    borderColor: "rgba(45,32,21,0.06)",
  },
  electron: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  e1: { top: -5, left: "50%", marginLeft: -5, backgroundColor: "rgba(255,107,107,0.72)" },
  e2: { right: -5, top: "55%", marginTop: -5, backgroundColor: "rgba(102,126,234,0.70)" },
  e3: { left: -5, top: "35%", marginTop: -5, backgroundColor: "rgba(255,154,86,0.78)" },
});