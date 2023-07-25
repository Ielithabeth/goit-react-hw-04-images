import { useState } from 'react';
import '../styles.css'

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { fetchImages } from "fetchImages";

let page = 1;

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('empty');
  const [totalHits, setTotalHits] = useState('0');

  const handleSubmit = async inputValue => {
    page = 1;

    try {
      setStatus('pending');
      const { totalHits, hits } = await fetchImages(inputValue, page);

      if (hits.length < 1) {
        setStatus('empty' );
      } else {
        setItems(hits);
        setInputValue(inputValue);
        setTotalHits(totalHits);
        setStatus('resolved');
      }
    } 
    
    catch (error) {
      setStatus('rejected');
    }
  };

  const handleNextPage = async () => {
    setStatus('pending');

    try {
      const { hits } = await fetchImages(inputValue, (page += 1));

      setItems(prevState => [...prevState, ...hits]);
      setStatus('resolved');
    } 
    
    catch (error) {
      setStatus('rejected');
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit}/>
      
      {status === 'pending' && (
        <>
          <ImageGallery page={page} items={items}/>
          <Loader/>
          {totalHits > 12 && <Button onClick={handleNextPage} />}
        </>
      )}

      {status === 'rejected' && (
        <p>Something went wrong, try later</p>
      )}

      {status === 'resolved' && (
        <>
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (<Button onClick={handleNextPage} />)}
        </>
      )}
    </>
    )
};
