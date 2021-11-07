import React, { useEffect, useState } from 'react';
import classes from "./App.module.scss"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import axios from "axios";

const loadImage = (imageName: string) => {
  return process.env.PUBLIC_URL + '/assets/' + imageName + '.jpeg'
}

interface Post {
  id: number,
  title: string,
  body: string,
  userId: number
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50,
    })
  );


  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      if (res.data) setPosts(res.data)
    })()
  }, [])

  const PostList = () => {
    return <div className={classes.List}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={posts.length}
            rowRenderer={({ key, index, style, parent }): {} => {
              const post = posts[index];
              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div style={style}>
                    <div className={classes.ListItem}>
                      <img src={loadImage('scene')} alt="Logo" />
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </div>
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  }

  return (
    <div className={classes.App}>
      {
        posts.length > 0 && <PostList />
      }
    </div>
  );
}

export default App;
