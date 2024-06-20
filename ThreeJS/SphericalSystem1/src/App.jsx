import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({OrbitControls})

export default function App()
{
    const {camera, gl} = useThree()
    const numSpheres = 10
    const posRefs = []

    for(let i = 0; i < numSpheres; i++){
        posRefs.push(useRef())
    }
    
    const spheres = []
    for(let i = 0; i < numSpheres; i++){
        spheres.push(
            <mesh ref={posRefs[i]} position={[getRandomArbitrary(-3, 3), getRandomArbitrary(-3, 3), getRandomArbitrary(-3, 3)]} scale={getRandomArbitrary(0.1, 0.75)} velocity={{x:getRandomArbitrary(-0.1, 0.1), y: getRandomArbitrary(-0.1, 0.1), z: getRandomArbitrary(-0.1, 0.1)}}>
                <sphereGeometry args={ [0.5, 32, 32] }/>
                <meshStandardMaterial color="red" />
            </mesh>
        )
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    useFrame((state, deltaTime) => {
        posRefs.forEach(ref => {
            ref.current.position.x += ref.current.velocity.x
            ref.current.position.y += ref.current.velocity.y
            ref.current.position.z += ref.current.velocity.z

            if(ref.current.position.x > 3.5 || ref.current.position.x < -3.5) ref.current.velocity.x *= -1
            if(ref.current.position.y > 3.5 || ref.current.position.y < -3.5) ref.current.velocity.y *= -1
            if(ref.current.position.z > 3.5 || ref.current.position.z < -3.5) ref.current.velocity.z *= -1

        });
    })
      
    return <>

        <orbitControls args={ [camera, gl.domElement] }/>
        <directionalLight position={[1, 2, 3]} intensity={2}/>
        <ambientLight instesity={0.5} />
        <mesh scale={7} position={0}>
            <boxGeometry/>
            <meshStandardMaterial color="purple" wireframe/>
        </mesh>
        {spheres}
    </>
}