/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.minimal_validate__get_searchname_from_uploaded_file;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_import.xsd_element_attr_names_constants.XSD_ElementAttributeNamesConstants;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;

/**
 * 
 *
 */
@Component
public class LimelightXMLFile_Minimal_Validate__GetSearchNameIfInFile implements LimelightXMLFile_Minimal_Validate__GetSearchNameIfInFile_IF {

	/**
	 * This does minimal validation of Limelight XML file
	 * and retrieves search name if in the file
	 * 
	 * @param limelightXMLFile_FirstBytes
	 * @return - search name if in file
	 * @throws XMLStreamException
	 * @throws IOException
	 * @throws LimelightWebappDataException
	 */
	@Override
	public String limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile( File limelightXMLFile )
			
			throws LimelightWebappDataException, XMLStreamException, IOException {
		
		
		String searchName = null;
		XMLEventReader xmlEventReader = null;
		
		try ( InputStream limelightXMLFileInputStream = new FileInputStream(limelightXMLFile) ) {
			try {
				XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
				xmlEventReader = xmlInputFactory.createXMLEventReader( limelightXMLFileInputStream );
				while ( xmlEventReader.hasNext() ) {
					XMLEvent event = xmlEventReader.nextEvent();
					if (event.isStartElement()) {
						StartElement startElement = event.asStartElement();
						if ( ! startElement.getName().getLocalPart().equals( XSD_ElementAttributeNamesConstants.ROOT_ELEMENT_limelight_INPUT__NAME ) ) {
							//  The first element found is not the root element in the XSD so this is an error
							throw new LimelightWebappDataException( "Limelight XML root node is not '" 
									+ XSD_ElementAttributeNamesConstants.ROOT_ELEMENT_limelight_INPUT__NAME
									+ "'.");
						}
						// this is the Limelight XML Root element, process it
						// read the attributes from this tag for the 
						// attribute to our object
						@SuppressWarnings("unchecked")
						Iterator<Attribute> attributes = startElement.getAttributes();
						while (attributes.hasNext()) {
							Attribute attribute = attributes.next();
							String attrName = attribute.getName().getLocalPart();
							String attrValue = attribute.getValue();
							if ( XSD_ElementAttributeNamesConstants.ATTR__NAME__ON_ROOT_ELEMENT_PROXL_INPUT__NAME.equals(attrName) ) {
								searchName = attrValue;
							}
						}
						break;  //  Exit Loop since processed first element
					}
				}
			} finally {
				if ( xmlEventReader != null ) {
					xmlEventReader.close();
				}
			}
		}
		
		return searchName;
	}
}
