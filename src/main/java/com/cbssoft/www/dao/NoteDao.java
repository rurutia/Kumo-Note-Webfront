package com.cbssoft.www.dao;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.cbssoft.www.domain.Note;

public class NoteDao {

	  @Autowired
	  private SqlSession sqlSession;
	  
	  public List<Note> selectNotes() {
		  return sqlSession.selectList("com.cbssoft.www.NoteMapper.selectNotes");
	  }
	  
	  public void insertNote(Note note) {
		  sqlSession.insert("com.cbssoft.www.NoteMapper.insertNote", note);
	  }
	  
	  public void deleteNote(int id) {
		  sqlSession.delete("com.cbssoft.www.NoteMapper.deleteNote", id);
	  }
	  
	  public void updateNote(Note note) {
		  sqlSession.update("com.cbssoft.www.NoteMapper.updateNote", note);
	  }
	  
}