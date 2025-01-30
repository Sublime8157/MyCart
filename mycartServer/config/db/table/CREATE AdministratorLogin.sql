IF OBJECT_ID('tblUsers') IS NULL
BEGIN
	CREATE TABLE [dbo].[tblUsers](
		[Id] [int] IDENTITY(1,1) NOT NULL,
		[Username] [varchar](255) NULL,
		[Email] [varchar](255) NULL,
		[Birthdate] [date] NULL,
		[MobileNo] [varchar](255) NULL,
		[Address] [varchar](255) NULL,
		[Password] [varchar](255) NULL,
		[DateVerified] [datetime] NULL,
		[LastLoggedIn] [datetime] NULL
	) ON [PRIMARY]
END
