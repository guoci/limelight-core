package org.yeastrc.limelight.limelight_shared.config_system_table_common_access;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Singleton Instance
 */
public class ConfigSystemTableGetValueCommon {

	private static final Logger log = LoggerFactory.getLogger( ConfigSystemTableGetValueCommon.class );
	
	/**
	 * private constructor
	 */
	private ConfigSystemTableGetValueCommon() { }

	/**
	 * Static singleton instance
	 */
	private static final ConfigSystemTableGetValueCommon _instance = new ConfigSystemTableGetValueCommon();
	
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static ConfigSystemTableGetValueCommon getInstance() {
		return _instance; 
	}
	
	/**
	 * object to call to actually get the value
	 */
	private IConfigSystemTableGetValue iConfigSystemTableGetValue;
	
	
	/**
	 * Set iConfigSystemTableGetValue to use to get values from config_system table
	 * 
	 * @param iConfigSystemTableGetValue
	 */
	public void setIConfigSystemTableGetValue( IConfigSystemTableGetValue iConfigSystemTableGetValue ) {
		
		this.iConfigSystemTableGetValue = iConfigSystemTableGetValue;
	}

	/**
	 * @param configKey
	 * @return null if not found
	 * @throws Exception
	 */
	public String getConfigValueForConfigKey( String configKey ) throws Exception {

		if ( iConfigSystemTableGetValue == null ) {
			
			String msg = "iConfigSystemTableGetValue is not configured.  getConfigValueForConfigKey(...)";
			log.error(msg);
			throw new IllegalStateException( msg );
		}
		
		return iConfigSystemTableGetValue.getConfigValueForConfigKey( configKey );
		
	}
}
