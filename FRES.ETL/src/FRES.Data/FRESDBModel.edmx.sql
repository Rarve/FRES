
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server Compact Edition
-- --------------------------------------------------
-- Date Created: 06/05/2017 11:56:06
-- Generated from EDMX file: C:\Git\fres\FRES.ETL\src\FRES.Data\FRESDBModel.edmx
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- NOTE: if the constraint does not exist, an ignorable error will be reported.
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- NOTE: if the table does not exist, an ignorable error will be reported.
-- --------------------------------------------------

    DROP TABLE [Address];
GO
    DROP TABLE [Location];
GO
    DROP TABLE [RealEstateE];
GO
    DROP TABLE [RealEstateT];
GO
    DROP TABLE [RealEstateType];
GO
    DROP TABLE [Address_bak];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Address'
CREATE TABLE [Address] (
    [AddressId] int IDENTITY(1,1) NOT NULL,
    [VillageName] nvarchar(100)  NOT NULL,
    [VillageNo] nvarchar(100)  NOT NULL,
    [SubDistrict] nvarchar(100)  NOT NULL,
    [District] nvarchar(100)  NOT NULL,
    [Province] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'Location'
CREATE TABLE [Location] (
    [LocationId] int IDENTITY(1,1) NOT NULL,
    [Province] nvarchar(50)  NOT NULL,
    [Amphur] nvarchar(50)  NULL,
    [ParcelCode] int  NULL,
    [Lat] float  NULL,
    [Lon] float  NULL
);
GO

-- Creating table 'RealEstateE'
CREATE TABLE [RealEstateE] (
    [RealEstateEId] bigint IDENTITY(1,1) NOT NULL,
    [Source] nvarchar(3)  NULL,
    [Url] nvarchar(4000)  NULL,
    [Data] ntext  NULL,
    [State] int  NULL,
    [Period] int  NULL,
    [RecordStatus] int  NULL,
    [CreatedBy] int  NULL,
    [CreatedDate] datetime  NULL,
    [ModifiedBy] int  NULL,
    [ModifiedDate] datetime  NULL,
    [RealEstateJson] ntext  NULL
);
GO

-- Creating table 'RealEstateT'
CREATE TABLE [RealEstateT] (
    [RealEstateTId] bigint IDENTITY(1,1) NOT NULL,
    [Source] nvarchar(3)  NULL,
    [Url] nvarchar(4000)  NULL,
    [Data] ntext  NULL,
    [Province] ntext  NULL,
    [District] ntext  NULL,
    [ParcelNo] ntext  NULL,
    [Lat] float  NULL,
    [Lon] float  NULL,
    [State] int  NULL,
    [Period] int  NULL,
    [RecordStatus] int  NULL,
    [CreatedBy] int  NULL,
    [CreatedDate] datetime  NULL,
    [ModifiedBy] int  NULL,
    [ModifiedDate] datetime  NULL
);
GO

-- Creating table 'RealEstateType'
CREATE TABLE [RealEstateType] (
    [RealEstateTypeId] int  NOT NULL,
    [Name_TH] nvarchar(50)  NULL,
    [Name_ENG] nvarchar(50)  NULL
);
GO

-- Creating table 'Address_bak'
CREATE TABLE [Address_bak] (
    [VillageName] nvarchar(100)  NOT NULL,
    [VillageNo] nvarchar(100)  NOT NULL,
    [SubDistrict] nvarchar(100)  NOT NULL,
    [District] nvarchar(100)  NOT NULL,
    [Province] nvarchar(100)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [AddressId] in table 'Address'
ALTER TABLE [Address]
ADD CONSTRAINT [PK_Address]
    PRIMARY KEY ([AddressId] );
GO

-- Creating primary key on [LocationId] in table 'Location'
ALTER TABLE [Location]
ADD CONSTRAINT [PK_Location]
    PRIMARY KEY ([LocationId] );
GO

-- Creating primary key on [RealEstateEId] in table 'RealEstateE'
ALTER TABLE [RealEstateE]
ADD CONSTRAINT [PK_RealEstateE]
    PRIMARY KEY ([RealEstateEId] );
GO

-- Creating primary key on [RealEstateTId] in table 'RealEstateT'
ALTER TABLE [RealEstateT]
ADD CONSTRAINT [PK_RealEstateT]
    PRIMARY KEY ([RealEstateTId] );
GO

-- Creating primary key on [RealEstateTypeId] in table 'RealEstateType'
ALTER TABLE [RealEstateType]
ADD CONSTRAINT [PK_RealEstateType]
    PRIMARY KEY ([RealEstateTypeId] );
GO

-- Creating primary key on [VillageName], [VillageNo], [SubDistrict], [District], [Province] in table 'Address_bak'
ALTER TABLE [Address_bak]
ADD CONSTRAINT [PK_Address_bak]
    PRIMARY KEY ([VillageName], [VillageNo], [SubDistrict], [District], [Province] );
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------