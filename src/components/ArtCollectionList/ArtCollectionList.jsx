import { Link } from 'react-router';

const ArtCollectionList = (props) => {
  return (
  <main>
    {props.artCollection.map((collection)=> (
   <Link key={collection._id} to={`/artcollections/${collection._id}`}>
    <article>
        <header>
            <h2>{collection.title}</h2>
            <p>
                {`${collection.author.username} posted on 
                ${new Date(collection.createdAt).toLocaleDateString()}`}
            </p>
        </header>
        <p>{collection.text}</p>
    </article>
   </Link>
    ))}
  </main>
  );
};

export default ArtCollectionList;