/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
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

package org.yeastrc.limelight.limelight_submit_import.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_submit_import.constants.ConfigPropertiesConstants;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportConfigException;

/**
 * 
 *
 */
public class ConfigParams {

	private static final Logger log = LoggerFactory.getLogger( ConfigParams.class );
	
	private static final ConfigParams instance = new ConfigParams();
	private ConfigParams() { }
	public static ConfigParams getSingletonInstance() { return instance; }
	
	private static final String NO_PROPERTIES_FILE_ERROR_MESSAGE = "No Configuration Properties file found.";
	
	private File configFileCommandLine;
	private String limelightWebAppUrl;
	private String limelightUploadBaseDir;
	private boolean submitterSameMachine;
	private boolean configured;
	
	public String getLimelightWebAppUrl() {
		if ( ! configured ) {
			throw new IllegalStateException("readConfigParams() not called or failed");
		}
		return limelightWebAppUrl;
	}
	public String getLimelightUploadBaseDir() {
		if ( ! configured ) {
			throw new IllegalStateException("readConfigParams() not called or failed");
		}
		return limelightUploadBaseDir;
	}
	public boolean isSubmitterSameMachine() {
		if ( ! configured ) {
			throw new IllegalStateException("readConfigParams() not called or failed");
		}
		return submitterSameMachine;
	}
	
	/**
	 * @return
	 */
	public boolean isConfigFileOnClassPath() {
		URL configFileUrlObjUrlLocal = getConfigFileOnClasspath_URL();
		if ( configFileUrlObjUrlLocal == null ) {
			return false;
		}
		return true;
	}
	
	/**
	 * @throws Exception
	 */
	public void readConfigParams() throws Exception {
		if ( configured ) {
			return;
		}
		String propertiesFilenameMaybeWithPath = null;
		Properties configProps = null;
		InputStream propertiesFileAsStream = null;
		try {
			if ( configFileCommandLine != null ) {
				propertiesFilenameMaybeWithPath = configFileCommandLine.getAbsolutePath();
				if ( ! configFileCommandLine.exists() ) {
					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
					String msg = "Properties file not found: " + configFileCommandLine.getAbsolutePath();
					log.error( msg );
					throw new LimelightSubImportConfigException( msg );
				}
				try {
					propertiesFileAsStream = new FileInputStream( configFileCommandLine );
				} catch ( FileNotFoundException e ) {
					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
					String msg = "Properties file not found: " + configFileCommandLine.getAbsolutePath() + " exception: " + e.toString();
					//					log.error( msg, e );
					throw new LimelightSubImportConfigException( msg );
				}
			} else {
				//  Get config file from class path
				URL configFileUrlObjUrlLocal = getConfigFileOnClasspath_URL();
				if ( configFileUrlObjUrlLocal == null ) {
					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
					String msg = "Properties file '" + ConfigPropertiesConstants.CONFIG_FILENAME + "' not found in class path.";
					//					log.error( msg );
					throw new LimelightSubImportConfigException( msg );
				} else {
					if ( log.isInfoEnabled() ) {
						log.info( "Properties file '" + ConfigPropertiesConstants.CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
					}
				}
				propertiesFilenameMaybeWithPath = configFileUrlObjUrlLocal.getFile();
				propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();
				if ( propertiesFileAsStream == null ) {
					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
					String msg = "Properties file '" + ConfigPropertiesConstants.CONFIG_FILENAME + "' not found in class path.";
					//					log.error( msg );
					throw new LimelightSubImportConfigException( msg );
				}
			}
			configProps = new Properties();
			configProps.load( propertiesFileAsStream );
		} catch (IOException e) {
			log.error( "In init(),   Properties file '" 
					+ propertiesFilenameMaybeWithPath + "', IOException: " + e.toString(), e );
			throw new LimelightSubImportConfigException( e );
		} finally {
			if ( propertiesFileAsStream != null ) {
				try {
					propertiesFileAsStream.close();
				} catch (IOException e) {
					log.error( "In init(), propertiesFileAsStream.close():   Properties file '" 
							+ propertiesFilenameMaybeWithPath + "', IOException: " + e.toString(), e );
					throw new LimelightSubImportConfigException( e );
				}
			}
		}
		limelightWebAppUrl = configProps.getProperty( ConfigPropertiesConstants.CONFIG_PARAM_LIMELIGHT_WEB_APP_URL );
		if ( limelightWebAppUrl != null ) {
			limelightWebAppUrl = limelightWebAppUrl.trim();
		}
		limelightUploadBaseDir = configProps.getProperty( ConfigPropertiesConstants.CONFIG_PARAM_LIMELIGHT_UPLOAD_BASE_DIR );
		if ( limelightUploadBaseDir != null ) {
			limelightUploadBaseDir = limelightUploadBaseDir.trim();
		}
		if ( StringUtils.isEmpty( limelightWebAppUrl ) ) {
			String msg = "For Config Properties file: parameter '" + ConfigPropertiesConstants.CONFIG_PARAM_LIMELIGHT_WEB_APP_URL + "' is not provided or is empty string.";
			System.err.println( msg );
			throw new LimelightSubImportConfigException(msg);
		}
		if ( StringUtils.isNotEmpty( limelightUploadBaseDir ) ) {
			submitterSameMachine = true;
		}
		configured = true;
	}
	
	/**
	 * @return
	 */
	private URL getConfigFileOnClasspath_URL() {
		ClassLoader thisClassLoader = this.getClass().getClassLoader();
		URL configFileUrlObjUrlLocal = thisClassLoader.getResource( ConfigPropertiesConstants.CONFIG_FILENAME );
		return configFileUrlObjUrlLocal;
	}
	
	/////////////////////////
	
	public File getConfigFileCommandLine() {
		return configFileCommandLine;
	}
	public void setConfigFileCommandLine(File configFileCommandLine) {
		this.configFileCommandLine = configFileCommandLine;
	}
}
