<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220315150105 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccin_type DROP FOREIGN KEY FK_43B6EB182E55F6D1');
        $this->addSql('ALTER TABLE vaccination_vaccin DROP FOREIGN KEY FK_86DE81AF9B14AC76');
        $this->addSql('ALTER TABLE vaccination_infirmier DROP FOREIGN KEY FK_D36E70FD4DDCCFA3');
        $this->addSql('ALTER TABLE vaccination_patient DROP FOREIGN KEY FK_14325DF84DDCCFA3');
        $this->addSql('ALTER TABLE vaccination_vaccin DROP FOREIGN KEY FK_86DE81AF4DDCCFA3');
        $this->addSql('DROP TABLE vaccin');
        $this->addSql('DROP TABLE vaccin_type');
        $this->addSql('DROP TABLE vaccination');
        $this->addSql('DROP TABLE vaccination_infirmier');
        $this->addSql('DROP TABLE vaccination_patient');
        $this->addSql('DROP TABLE vaccination_vaccin');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE vaccin (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccin_type (id INT AUTO_INCREMENT NOT NULL, vaccin_id_id INT NOT NULL, nom VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, stock INT DEFAULT NULL, INDEX IDX_43B6EB182E55F6D1 (vaccin_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccination (id INT AUTO_INCREMENT NOT NULL, date_vaccination DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccination_infirmier (vaccination_id INT NOT NULL, infirmier_id INT NOT NULL, INDEX IDX_D36E70FD4DDCCFA3 (vaccination_id), INDEX IDX_D36E70FDC2BE0752 (infirmier_id), PRIMARY KEY(vaccination_id, infirmier_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccination_patient (vaccination_id INT NOT NULL, patient_id INT NOT NULL, INDEX IDX_14325DF84DDCCFA3 (vaccination_id), INDEX IDX_14325DF86B899279 (patient_id), PRIMARY KEY(vaccination_id, patient_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE vaccination_vaccin (vaccination_id INT NOT NULL, vaccin_id INT NOT NULL, INDEX IDX_86DE81AF4DDCCFA3 (vaccination_id), INDEX IDX_86DE81AF9B14AC76 (vaccin_id), PRIMARY KEY(vaccination_id, vaccin_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE vaccin_type ADD CONSTRAINT FK_43B6EB182E55F6D1 FOREIGN KEY (vaccin_id_id) REFERENCES vaccin (id)');
        $this->addSql('ALTER TABLE vaccination_infirmier ADD CONSTRAINT FK_D36E70FD4DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vaccination_infirmier ADD CONSTRAINT FK_D36E70FDC2BE0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vaccination_patient ADD CONSTRAINT FK_14325DF84DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vaccination_patient ADD CONSTRAINT FK_14325DF86B899279 FOREIGN KEY (patient_id) REFERENCES patient (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vaccination_vaccin ADD CONSTRAINT FK_86DE81AF4DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vaccination_vaccin ADD CONSTRAINT FK_86DE81AF9B14AC76 FOREIGN KEY (vaccin_id) REFERENCES vaccin (id) ON DELETE CASCADE');
    }
}
