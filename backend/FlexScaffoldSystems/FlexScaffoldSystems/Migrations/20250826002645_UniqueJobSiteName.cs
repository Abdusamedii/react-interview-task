using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlexScaffoldSystems.Migrations
{
    /// <inheritdoc />
    public partial class UniqueJobSiteName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "JobSites",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_JobSites_Name",
                table: "JobSites",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_JobSites_Name",
                table: "JobSites");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "JobSites",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
