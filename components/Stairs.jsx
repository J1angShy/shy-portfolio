import { motion } from "framer-motion";

const stairAnimation = {
    initial: {
        top: "0%",
    },
    animate: {
        top:"100%",
    },
    exit: {
        top: ["100%","0%"],
    },
};

//calcuate the reverse index for staggered delay
const reverseIndex = (index) => {
    const totalSteps = 10; 
    return totalSteps - index - 1;
}

const Stairs = () => {
  return (
      <>
          {/* render 6 motion divs, each represent a step of the stairs

            - Each will have the same animation defined by the stairsAnimation object. 
            - The delay of each div is calculated dinamically based on its reversed index,
            creating a staggered effect with decreasing delay for each subsequent step
          */}
          {[...Array(10)].map((_, index) => {
              return (
                  <motion.div
                      key={index}
                      variants={stairAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{
                          duration: 0.2,
                          ease: 'easeInOut',
                          delay: reverseIndex(index) * 0.05,
                      }}
                      className="h-full w-full bg-white relative"
                  />
              )
          })}
      </>
  )
}

export default Stairs