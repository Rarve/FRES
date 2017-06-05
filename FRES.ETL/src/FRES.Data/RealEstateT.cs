//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FRES.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class RealEstateT
    {
        public long RealEstateTId { get; set; }
        public string Source { get; set; }
        public string Url { get; set; }
        public string Data { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string ParcelNo { get; set; }
        public Nullable<double> Lat { get; set; }
        public Nullable<double> Lon { get; set; }
        public Nullable<int> State { get; set; }
        public Nullable<int> Period { get; set; }
        public Nullable<int> RecordStatus { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
}
