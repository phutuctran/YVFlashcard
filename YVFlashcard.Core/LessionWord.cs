//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace YVFlashcard.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class LessionWord
    {
        [Key]public int id { get; set; }
        public int LessionInfoId { get; set; }
        public int WordId { get; set; }
    
        public virtual LessionInfo LessionInfo { get; set; }
        public virtual Word Word { get; set; }
    }
}
