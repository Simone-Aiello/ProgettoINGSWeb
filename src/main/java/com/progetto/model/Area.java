package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;

import java.util.Objects;

import com.progetto.Utils;

public class Area {
	private long id;
	private String name;
	private String icon;
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		isTrue(id > 0);
		this.id = id;
	}



	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Area other = (Area) obj;
		return id == other.id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		notNull(name);
		Utils.sanitizeXSS(name);
		this.name = name;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
}
