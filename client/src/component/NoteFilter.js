import React, {useState} from 'react';
import TagList from "./TagList";
import SearchFilter from "./SearchFilter";

const NoteFilter = ({tagList, onSearch}) => {
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleTagSelected = (values) => {
    setTags(values);
    onSearch({
      note: keyword,
      tags: values
    });
  };

  const handleSearch = (value) => {
    setKeyword(value);
    onSearch({
      note: value,
      tags: tags
    });
  };

  return (
    <SearchFilter onSearch={handleSearch}>
      <TagList
        label={'Tags:'} value={tags}
        editable={false}
        tagStyle={{display: 'flex', width: '60px', marginLeft: '16px'}}
        tagDict={tagList}
        onSumbit={(values) => handleTagSelected(values)}
      ></TagList>
    </SearchFilter>
  );
};

export default NoteFilter;