using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace YVFlashcard.Core.Service.Util
{
    public class DataHelper
    {
        public string CopyImage(string sourceImagePath, string destinationDirectory)
        {
            try
            {
                // Kiểm tra xem tệp nguồn có tồn tại không
                if (File.Exists(sourceImagePath))
                {
                    // Tạo đường dẫn đầy đủ cho tệp đích
                    string destinationPath = Path.Combine(destinationDirectory, Path.GetFileName(sourceImagePath));

                    // Kiểm tra xem thư mục đích có tồn tại không, nếu không thì tạo mới
                    if (!Directory.Exists(destinationDirectory))
                    {
                        Directory.CreateDirectory(destinationDirectory);
                    }

                    // Sao chép tệp từ nguồn đến đích
                    File.Copy(sourceImagePath, destinationPath, true);
                    return destinationPath;
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Đã xảy ra lỗi: " + ex.Message);
                return "";
            }
        }
    }
}
