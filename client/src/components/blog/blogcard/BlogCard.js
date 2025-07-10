import styles from './blogcard.module.scss'
import {AiFillPlayCircle} from 'react-icons/ai'
const BlogCard = ({blog}) => {
  return (
    <div className={styles.blogcontainer}>
          <div className={styles.date}>
            <div className={styles.day}>01</div>
            <div className={styles.month}>JAN</div>
          </div>
        <div className={styles.imgcontainer}>
          <img className={styles.blogimg} src={blog.img} alt=''/>
        </div>
        <div className={styles.blogtitle}>
        {blog.title}
        </div>
        <div className={styles.blogsum}>
          {blog.sum}
        </div>
        <div className={styles.more}>
          <span>Read More</span>
          <AiFillPlayCircle className={styles.playIcon}/>
        </div>
    </div>
  )
}

export default BlogCard;