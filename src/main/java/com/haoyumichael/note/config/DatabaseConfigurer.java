package com.haoyumichael.note.config;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.springframework.beans.factory.annotation.Autowired;

public class DatabaseConfigurer {
	
	@Autowired
	DataSource datasource;
	
	private Connection conn;

	public void init() throws SQLException, IOException {
		conn = datasource.getConnection();
		DatabaseMetaData metaData = conn.getMetaData();
		if(!metaData.getTables(null, null, "NOTE", null).next()) {
			new ScriptRunner(conn)
			.runScript(Resources.getResourceAsReader("com/haoyumichael/note/sql/mysql_create.sql"));
		}
	}
	
}
