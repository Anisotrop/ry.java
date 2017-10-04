/**
 * Copyright 2016-2017 Kaazing Corporation
 */
package org.kaazing.ry.internal;

import java.util.Properties;

import org.reaktivity.nukleus.Configuration;

public final class RyConfiguration extends Configuration
{
    public RyConfiguration(
        Properties defaultOverrides)
    {
        super(new Configuration(), defaultOverrides);
    }
}
