import { postData } from '../../data/dummyPostData';
import SinglePost from './Singlepost';
import { ScrollArea } from './ui/scroll-area';

const PostWall = () => {
  return (
    <ScrollArea className='w-full h-[1000px] flex flex-col-reverse'>
      <div className='flex flex-col gap-5'>
        {postData.map((post) => {
          return (
            <SinglePost post={post} key={ post.id} />
          )
        })}
      </div>
    </ScrollArea>
  )
}

export default PostWall