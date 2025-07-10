
import { useState } from 'react'
import styles from './blogslider.module.scss'
import {TbChevronLeft} from 'react-icons/tb'
import {TbChevronRight} from 'react-icons/tb'

import BlogCard from './blogcard/BlogCard'


const BlogSlider = () => {

    const fakedata = [
        {
        img:'https://m2.alothemes.com/safira/media/magefan_blog/blog-furniture-2.jpg',
        title:"About Celebrity Daughter Opens",
        sum:"Diga, Koma and Torus are three kitchen a new design-oriented brand at the Ambiente show in February 2016"
    },
        {
        img:'https://m2.alothemes.com/safira/media/magefan_blog/blog-furniture-2.jpg',
        title:"About Celebrity Daughter Opens",
        sum:"Diga, Koma and Torus are three kitchen a new design-oriented brand at the Ambiente show in February 2016"
    },
        {
        img:'https://m2.alothemes.com/safira/media/magefan_blog/blog-furniture-2.jpg',
        title:"About Celebrity Daughter Opens",
        sum:"Diga, Koma and Torus are three kitchen a new design-oriented brand at the Ambiente show in February 2016"
    },
        {
        img:'https://m2.alothemes.com/safira/media/magefan_blog/blog-furniture-2.jpg',
        title:"About Celebrity Daughter Opens",
        sum:"Diga, Koma and Torus are three kitchen a new design-oriented brand  at the Ambiente show in February 2016"
    },
        {
        img:'https://m2.alothemes.com/safira/media/magefan_blog/blog-furniture-2.jpg',
        title:"About Celebrity Daughter Opens",
        sum:"Diga, Koma and Torus are three kitchen a new design-oriented brand  at the Ambiente show in February 2016"
    },
]

    const [slidePercentage,setSlidePercentage] = useState(0)
     const [isLeftReached,setIsLeftReached] = useState(false)
     const [isRightReached,setIsRightReached] = useState(false)

    const leftMovement = ()=>{
        // console.log(slidePercentage)
        if (slidePercentage===0) {
            setIsLeftReached(true)
        }else
            {   setSlidePercentage(slidePercentage + 100)
                setIsLeftReached(false)
                setIsRightReached(false)
                
            }
    }

    const rightMovement = ()=>{
        // console.log(slidePercentage)
        if (slidePercentage===-100*(1)) {
            setIsRightReached(true)
        }else
            {

            setSlidePercentage(slidePercentage - 100)  
            setIsRightReached(false)
            setIsLeftReached(false)
            }
    }
    return (  
        <div className={styles.bg}>
            <div className={styles.info}>
                <h2 className={styles.producttitle}>Latest Blogs</h2>
                <div className={styles.discription}>Present posts in a best way to highlight interesting moments of your blog.</div>
            </div>
            <ul className={styles.cardslider}>
                {
                    fakedata.map((blog,index)=>{
                        return (
                            <li className={styles.cardwrap} key={index} style={{ transform: `translateX(${slidePercentage}%)` }}>
                               <BlogCard blog={blog}/>
                            </li>
                            )
                    })
                }


                <button className={styles.cardleftbtn} disabled={isLeftReached} onClick={leftMovement}><TbChevronLeft size={42}/></button>
                <button className={styles.cardrightbtn} disabled={isRightReached} onClick={rightMovement}><TbChevronRight size={42}/></button>
                    
            </ul>
        </div>
    );
}
 
export default BlogSlider;