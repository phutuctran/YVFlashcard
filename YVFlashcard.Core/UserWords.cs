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

    public partial class UserWords
    {
        [Key]public int wordId { get; set; }
        public string word { get; set; }
        public string pronunciation { get; set; }
        public string definition { get; set; }
        public string partOfSpeech { get; set; }
        public string imageOrSynomyn { get; set; }
        public int LessionId { get; set; }
    }
}
