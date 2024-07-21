import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useGLTF, useTexture } from '@react-three/drei'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/card.gltf')
useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')

export default function Card() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 22 }} style={{ width: '500px', height: '500px' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]}/>
            <Physics  interpolate gravity={[0, -70, 0]} timeStep={1 / 60}>
                <Band />
            </Physics>
        </Canvas>
    )
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
    
    const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
    const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
    const { width, height } = useThree((state) => state.size)
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
    const [dragged, drag] = useState(false)
    const photoTexture = useTexture('assets/photo.png')
    const texture = useTexture('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')
    const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))
                ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
        }
        if (fixed.current) {
            // Fix most of the jitter when over pulling the card
            [j1, j2].forEach((ref) => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
                ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
            })
            // Calculate catmul curve      
            curve.points[0].copy(j3.current.translation())
            curve.points[1].copy(j2.current.translation())
            curve.points[2].copy(j1.current.translation())
            curve.points[3].copy(fixed.current.translation())
            band.current.geometry.setPoints(curve.getPoints(32))
            // Tilt it back towards the screen
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
        }
    })

    curve.curveType = 'chordal'
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} angularDamping={2} linearDamping={2} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} angularDamping={2} linearDamping={2}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} angularDamping={2} linearDamping={2}>
                    <BallCollider args={[0.1]} />
                </RigidBody >
                <RigidBody position={[1.5, 0, 0]} ref={j3} angularDamping={2} linearDamping={2}>
                    <BallCollider args={[0.1]} />
                </RigidBody >
                <RigidBody position={[2, 0, 0]} ref={card} angularDamping={2} linearDamping={2} type={dragged ? 'kinematicPosition' : 'dynamic'} >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        position={[0, 0.2, 0.2]}
                        onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                        onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
                    >
                        <mesh>
                            <planeGeometry args={[1.2 * 2, 1.13 * 2]} position={ [0,-2,0]} />
                            <meshBasicMaterial map={photoTexture} color={'#D3D3D3'} side={THREE.DoubleSide} />
                        </mesh>
                        
                        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.2} />
                        
                    </group>
                    
                </RigidBody >
            </group >
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial color="green" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={1} />
            </mesh>
        </>
    )
}