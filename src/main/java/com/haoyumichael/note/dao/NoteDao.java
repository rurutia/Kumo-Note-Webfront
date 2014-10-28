package com.haoyumichael.note.dao;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.haoyumichael.note.domain.Note;

public class NoteDao {

	  @Autowired
	  private SqlSession sqlSession;
	  
	  public List<Note> selectNotes() {
		  return sqlSession.selectList("com.haoyumichael.note.NoteMapper.selectNotes");
	  }
	  
	  public Note selectSingleNote(int id) {
		  return sqlSession.selectOne("com.haoyumichael.note.NoteMapper.selectSingleNote", id);
	  }
	  
	  public void insertNote(Note note) {
		  sqlSession.insert("com.haoyumichael.note.NoteMapper.insertNote", note);
	  }
	  
	  public void deleteNote(int id) {
		  sqlSession.delete("com.haoyumichael.note.NoteMapper.deleteNote", id);
	  }
	  
	  public void updateNote(Note note) {
		  sqlSession.update("com.haoyumichael.note.NoteMapper.updateNote", note);
	  }
	  
}