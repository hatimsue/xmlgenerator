import XMLGenerator from '../src/XMLGenerator.js'

const builder = new XMLGenerator()
const _ = builder._
const InvoiceAuthorization = 'fdasdfadf'
const AuthorizationPeriod = {
    StartDate: 'date',
    EndDate: 'end'
}
const xml =
    _.Invoice
        .xmlns( 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2' )
        .xmlns.cac( 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2' )
        .xmlns.cbc( 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2' )
        .xmlns.ds( 'http://www.w3.org/2000/09/xmldsig#' )
        .xmlns.ext( 'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2' )
        .xmlns.xades( 'http://uri.etsi.org/01903/v1.3.2#' )
        .xmlns.xades141( 'http://uri.etsi.org/01903/v1.4.1#' )
        .xmlns.xsi( 'http://www.w3.org/2001/XMLSchema-instance' )(
            _.ext.UBLExtension(
                _.ext.ExtensionContent(
                    _.sts.DianExtensions(
                        _.sts.InvoiceControl(
                            _.sts.InvoiceAuthorization( InvoiceAuthorization ),
                            _.sts.AuthorizationPeriod(
                                _.cbc.StartDate( AuthorizationPeriod.StartDate ),
                                _.cbc.EndDate( AuthorizationPeriod.EndDate )
                            ),
                            _.sts.AuthorizedInvoices(
                                _.sts.Prefix( 'SETP' ),
                                _.sts.From( '990000000' ),
                                _.sts.To( '995000000' )
                            )
                        ),
                        _.sts.InvoiceSource(
                            _.cbc.IdentificationCode
                                .listAgencyID( '6' )
                                .listAgencyName( 'United Nations Economic Commission for Europe' )
                                .listSchemeURI( 'urn:oasis:names:specification:ubl:codelist:gc:CountryIdentificationCode-2.1' )(
                                    'CO'
                                )
                        ),
                        _.sts.SoftwareProvider(
                            _.sts.ProviderID
                                .schemeAgencyID( '195' )
                                .schemeAgencyName( 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)' )
                                .schemeID( '4' )
                                .schemeName( '31' )( '800197268' ),
                            _.sts.SoftwareID
                                .schemeAgencyID( '195' )
                                .schemeAgencyName( 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)' )(
                                    '56f2ae4e-9812-4fad-9255-08fcfcd5ccb0'
                                )
                        ),
                        _.sts.SoftwareSecurityCode
                            .schemeAgencyID( '195' )
                            .schemeAgencyName( 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)' )(
                                'a8d18e4e5aa00b44a0b1f9ef413ad8215116bd3ce91730d580eaed795c83b5a32fe6f0823abc71400b3d59eb542b7de8'
                            ),
                        _.sts.AuthorizationProvider(
                            _.sts.AuthorizationProviderID
                                .schemeAgencyID( '195' )
                                .schemeAgencyName( 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)' )
                                .schemeID( '4' )
                                .schemeName( '31' )( '800197268' )
                        ),
                        _.sts.QRCode(
                            'NroFactura=SETP990000002 NitFacturador=800197268 NitAdquiriente=900108281 FechaFactura=2019-06-20 ValorTotalFactura=14024.07 CUFE=941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694 URL=https://catalogo-vpfe-hab.dian.gov.co/Document/FindDocument?documentKey=941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694&partitionKey=co|06|94&emissionDate=20190620'
                        )
                    )
                )
            )
        )


console.log( xml.toPrettyXML() )

